import React, { Component } from "react";
import { API, Storage } from "aws-amplify";
import { Image, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { s3Upload } from "../libs/awsLib";
import config from "../config";
import "./BlogPost.css";

export default class BlogPost extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: null,
      isDeleting: null,
      blogPost: null,
      title: "",
      content: "",
      blogPostState: "",
      imageURL: null
    };
  }

  async componentDidMount() {
    try {
      let imageURL;
      const blogPost = await this.getBlogPost();
      const { title, content, image, blogPostState } = blogPost;

      if (image) {
        imageURL = await Storage.vault.get(image);
      }

      this.setState({
        blogPost,
        title,
        content,
        blogPostState,
        imageURL
      });
    } catch (e) {
      alert(e);
    }
  }

  getBlogPost() {
    return API.get("blogPosts", `/blogPosts/${this.props.match.params.id}`);
  }

  publishBlogPost(blogPost) {
    return API.put("blogPosts", `/blogPosts/${this.props.match.params.id}`, {
      body: blogPost
    });
  }

  deleteBlogPost() {
    return API.del("blogPosts", `/blogPosts/${this.props.match.params.id}`);
  }

  validateForm() {
    return this.state.title.length > 0 && this.state.content.length > 0;
  }

  formatFilename(str) {
    return str.replace(/^\w+-/, "");
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleFileChange = event => {
    this.file = event.target.files[0];
  }

  handleSubmit = async event => {
    let image;

    event.preventDefault();

    if (this.file) {
      if (this.file.size > config.MAX_ATTACHMENT_SIZE) {
        alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
        return;
      }
      var fileExtension = this.file.name.toLowerCase().split('.')[1];
      if (!["jpg", "jpeg", "png", "gif"].includes(fileExtension)) {
        alert(`Please pick an image file.`);
        return;
      }
    }

    this.setState({ isLoading: true });

    try {
      if (this.file) {
        image = await s3Upload(this.file);
      }

      await this.publishBlogPost({
        title: this.state.title,
        content: this.state.content,
        image: image || this.state.blogPost.image,
        blogPostState: "Published"
      });
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  handleDelete = async event => {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this blog post?"
    );

    if (!confirmed) {
      return;
    }

    this.setState({ isDeleting: true });

    try {
      await this.deleteBlogPost();
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isDeleting: false });
    }
  }

  render() {
    return (
      <div className="BlogPost">
        {this.state.blogPost &&
          <form onSubmit={this.handleSubmit}>
            {this.state.blogPost.image &&
              <FormGroup className="image-form-group">
                <ControlLabel>Image</ControlLabel>
                <FormControl.Static>
                  <Image src={this.state.imageURL} responsive />
                </FormControl.Static>
              </FormGroup>}
            <FormGroup controlId="file">
              {!this.state.blogPost.image &&
                <ControlLabel>Image</ControlLabel>}
              <FormControl onChange={this.handleFileChange} type="file" />
            </FormGroup>
            <FormGroup controlId="title">
              <ControlLabel>Title</ControlLabel>
              <FormControl
                onChange={this.handleChange}
                value={this.state.title}
                type="text"
              />
            </FormGroup>
            <FormGroup controlId="content">
              <ControlLabel>Content</ControlLabel>
              <FormControl
                onChange={this.handleChange}
                value={this.state.content}
                componentClass="textarea"
              />
            </FormGroup>
            <LoaderButton
              block
              bsStyle="primary"
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Update"
              loadingText="Updating..."
            />
            <LoaderButton
              block
              bsStyle="danger"
              bsSize="large"
              isLoading={this.state.isDeleting}
              onClick={this.handleDelete}
              text="Delete"
              loadingText="Deleting…"
            />
          </form>}
      </div>
    );
  }
}
