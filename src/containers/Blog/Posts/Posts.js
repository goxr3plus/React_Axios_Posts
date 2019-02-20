import React, { Component } from "react";
import axios from "../../../axios";
import Post from "./../../../components/Post/Post";
import "./Posts.css";
import { Link } from "react-router-dom";

class Posts extends Component {
  state = {
    posts: []
  };

  postSelectedHandler = id => {
    this.setState({ selectedPostId: id });
  };

  componentDidMount() {
    console.log(this.props);
    axios
      .get("/posts")
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: "Max"
          };
        });
        this.setState({ posts: updatedPosts });
      })
      .catch(error => {
        console.log(error);
        //this.setState({ error: true });
      });
  }

  render() {
    let posts = <p style={{ textAlign: "center" }}> Something went wrong!</p>;
    if (!this.state.error)
      posts = this.state.posts.map(post => {
        return (
          <Link key={post.id} to={"/" + post.id}>
            <Post
              key={post.id}
              title={post.title}
              author={post.author}
              clicked={() => this.postSelectedHandler(post.id)}
            />
          </Link>
        );
      });

    return (
      <div>
        <section className="Posts">{posts}</section>
      </div>
    );
  }
}

export default Posts;