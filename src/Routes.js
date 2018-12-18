import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import BlogPost from "./containers/BlogPost";
import Login from "./containers/Login";
import NewBlogPost from "./containers/NewBlogPost";
import NotFound from "./containers/NotFound";
import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <AuthenticatedRoute path="/blogPosts/new" exact component={NewBlogPost} props={childProps} />
    <AuthenticatedRoute path="/blogPosts/:id" exact component={BlogPost} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
