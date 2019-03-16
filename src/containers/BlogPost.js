import React, { Component } from "react";
import { API, Auth } from "aws-amplify";
import { Image, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { s3Upload } from "../libs/awsLib";
import TextEditor from './TextEditor';
import "./BlogPost.css";
import config from "../config";

export default class BlogPost extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isPublishing: null,
      isSavingDraft: null,
      isDeleting: null,
      blogPost: null,
      title: "",
      content: "",
      blogPostState: "",
      publishedDate: "",
      imageURL: null
    };
  }

  async componentDidMount() {
    this.props.leaveHomePage();

    try {
      const userInfo = await Auth.currentUserInfo();
      let imageURL;
      const blogPost = await this.getBlogPost();
      const { title, content, image, blogPostState, publishedDate } = blogPost;

      if (image) {
        imageURL = config.cloudFront.URL + userInfo.id + "/" + image;
      }

      this.setState({
        blogPost,
        title,
        content,
        blogPostState,
        publishedDate,
        imageURL
      });
    } catch (e) {
      alert(e);
    }
  }

  getBlogPost() {
    return API.get("blogPosts", `/blogPosts/${this.props.match.params.id}`);
  }

  updateBlogPost(blogPost) {
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

  handleTitleChange = event => {
    this.setState({
      title: event.target.value
    });
  }

  handleContentChange = event => {
    this.setState({
      content: event
    });
  }

  handleFileChange = event => {
    this.file = event.target.files[0];
    this.setState({ imageURL: URL.createObjectURL(this.file) });
  }

  handlePublish = async event => {
    let image;

    event.preventDefault();

    if (this.file) {
      var fileExtension = this.file.name.toLowerCase().split('.')[1];
      if (!["jpg", "jpeg", "png", "gif"].includes(fileExtension)) {
        alert(`Please pick an image file.`);
        return;
      }
    } else if (!this.state.imageURL) {
      alert(`Please upload an image.`);
      return;
    }

    this.setState({ isPublishing: true });

    try {
      if (this.file) {
        image = await s3Upload(this.file);
      }

      await this.updateBlogPost({
        title: this.state.title,
        content: this.state.content,
        image: image || this.state.blogPost.image,
        blogPostState: "Published",
        publishedDate: this.state.publishedDate || (new Date()).toLocaleString()
      });
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isPublishing: false });
    }
  }

  handleSaveDraft = async event => {
    let image;

    event.preventDefault();

    if (this.file) {
      var fileExtension = this.file.name.toLowerCase().split('.')[1];
      if (!["jpg", "jpeg", "png", "gif"].includes(fileExtension)) {
        alert(`Please pick an image file.`);
        return;
      }
    }

    this.setState({ isSavingDraft: true });

    try {
      if (this.file) {
        image = await s3Upload(this.file);
      }

      await this.updateBlogPost({
        title: this.state.title,
        content: this.state.content,
        image: image || this.state.blogPost.image,
        blogPostState: "Draft",
        publishedDate: ""
      });
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isSavingDraft: false });
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
          <form onSubmit={this.handlePublish}>
            {this.state.imageURL &&
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
                onChange={this.handleTitleChange}
                value={this.state.title}
                type="text"
              />
            </FormGroup>
            <FormGroup controlId="content">
              <ControlLabel>Content</ControlLabel>
              <TextEditor
                onChange={this.handleContentChange}
                startingValue={this.state.content}
              />
            </FormGroup>
            <LoaderButton
              block
              bsStyle="warning"
              bsSize="large"
              disabled={!this.validateForm()}
              onClick={this.handleSaveDraft}
              isLoading={this.state.isSavingDraft}
              text={this.state.blogPostState === "Published" ? "Unpublish" : "Save Draft"}
              loadingText={this.state.blogPostState === "Published" ? "Unpublishing..." : "Saving Draft..."}
            />
            <LoaderButton
              block
              bsStyle="primary"
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isPublishing}
              text={this.state.blogPostState === "Published" ? "Update" : "Publish"}
              loadingText={this.state.blogPostState === "Published" ? "Updating..." : "Publishing..."}
            />
            <LoaderButton
              block
              bsStyle="danger"
              bsSize="large"
              onClick={this.handleDelete}
              isLoading={this.state.isDeleting}
              text="Delete"
              loadingText="Deleting…"
            />
          </form>}
      </div>
    );
  }
}
