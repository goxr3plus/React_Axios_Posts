import React, { Component } from "react";
import axios from "../../../axios";
import Post from "./../../../components/Post/Post";
import "./Posts.css";
import { Route } from "react-router-dom";
import FullPost from "./../FullPost/FullPost";

class Posts extends Component {
  state = {
    posts: [],
    loading: false
  };

  postSelectedHandler = id => {
    this.props.history.push({ pathname: "/posts/" + id });
  };

  componentDidMount() {
    //console.log(this.props);
    this.setState({ loading: true });
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
        this.setState({ posts: updatedPosts, loading: false });
      })
      .catch(error => {
        console.log(error);
        //this.setState({ error: true });
        this.setState({ loading: false });
      });
  }

  render() {
    let posts = <p style={{ textAlign: "center" }}> Something went wrong!</p>;
  
    if (!this.state.error)
      posts = this.state.posts.map(post => {
        return (
          // <Link key={post.id} to={"/" + post.id}>
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            clicked={() => this.postSelectedHandler(post.id)}
          />
          // </Link>
        );
      });
    return (
      <div>
        <section className="Posts">{posts}</section>
        {this.state.loading ?<p style={{ textAlign: "center" }}> Loading... </p> :null}
        <Route path={"/posts/:id"} component={FullPost} />
      </div>
    );
  }
}

export default Posts;
