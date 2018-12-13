import React, { Component } from "react";
import { API } from "aws-amplify";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      blogPosts: []
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const blogPosts = await this.blogPosts();
      this.setState({ blogPosts });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  blogPosts() {
    return API.get("blogPosts", "/blogPosts");
  }

  renderBlogPostsList(blogPosts) {
    return [{}].concat(blogPosts).map(
      (blogPost, i) =>
        i !== 0
          ? <LinkContainer
              key={blogPost.blogPostId}
              to={`/blogPosts/${blogPost.blogPostId}`}
            >
              <ListGroupItem header={blogPost.content.trim().split("\n")[0]}>
                {"Created: " + new Date(blogPost.createdAt).toLocaleString()}
              </ListGroupItem>
            </LinkContainer>
          : <LinkContainer
              key="new"
              to="/blogPosts/new"
            >
              <ListGroupItem>
                <h4>
                  <b>{"\uFF0B"}</b> Create a new blog post
                </h4>
              </ListGroupItem>
            </LinkContainer>
    );
  }

  renderLander() {
    return (
      <div className="lander">
        <h1>Blog Admin</h1>
        <p>A simple blog posting CMS</p>
        <div>
          <Link to="/login" className="btn btn-info btn-lg">
            Login
          </Link>
        </div>
      </div>
    );
  }

  renderBlogPosts() {
    return (
      <div className="blogPosts">
        <PageHeader>Your Blog Posts</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderBlogPostsList(this.state.blogPosts)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderBlogPosts() : this.renderLander()}
      </div>
    );
  }
}
