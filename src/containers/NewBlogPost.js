import React, { Component } from "react";
import { API } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { s3Upload } from "../libs/awsLib";
import config from "../config";
import "./NewBlogPost.css";

export default class NewBlogPost extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isPublishing: null,
      isSavingDraft: null,
      title: "",
      content: ""
    };
  }

  createBlogPost(blogPost) {
    return API.post("blogPosts", "/blogPosts", {
      body: blogPost
    });
  }

  validateForm() {
    return this.state.title.length > 0 && this.state.content.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleFileChange = event => {
    this.file = event.target.files[0];
  }

  handlePublish = async event => {
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
    } else {
      alert(`Please upload an image.`);
      return;
    }

    this.setState({ isPublishing: true });

    try {
      const image = this.file
        ? await s3Upload(this.file)
        : null;

      await this.createBlogPost({
        image,
        title: this.state.title,
        content: this.state.content,
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
    } else {
      alert(`Please upload an image.`);
      return;
    }

    this.setState({ isSavingDraft: true });

    try {
      const image = this.file
        ? await s3Upload(this.file)
        : null;

      await this.createBlogPost({
        image,
        title: this.state.title,
        content: this.state.content,
        blogPostState: "Draft"
      });
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isSavingDraft: false });
    }
  }

  render() {
    return (
      <div className="NewBlogPost">
        <form onSubmit={this.handlePublish}>
          <FormGroup controlId="file">
            <ControlLabel>Image</ControlLabel>
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
              bsStyle="warning"
              bsSize="large"
              disabled={!this.validateForm()}
              onClick={this.handleSaveDraft}
              isLoading={this.state.isSavingDraft}
              text="Save Draft"
              loadingText="Saving Draft..."
            />
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isPublishing}
            text="Publish"
            loadingText="Publishing..."
          />
        </form>
      </div>
    );
  }
}
