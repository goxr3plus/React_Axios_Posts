import React, { Component } from "react";
import "./Blog.css";
import Posts from "./Posts/Posts";
import { Route, NavLink } from "react-router-dom";
import NewPost from "./NewPost/NewPost";

class Blog extends Component {
  componentDidMount() {
    console.log("[Blog.js] ", this.props);
  }

  render() {
    console.log("[Blog.js] ", this.props);
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink
                  to="/"
                  exact
                  activeClassName="my-active"
                  activeStyle={{
                    color: "firebrick",
                    textDecoration: "underline"
                  }}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: "/new-post",
                    hash: "#submit",
                    search: "?quick-submit=true"
                  }}
                  activeClassName="my-active"
                >
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Route path="/" exact component={Posts} />
        <Route path="/new-post" component={NewPost} />
      </div>
    );
  }
}

export default Blog;
