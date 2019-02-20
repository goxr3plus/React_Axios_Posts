import axios from "axios";
import React, { Component } from "react";
import "./FullPost.css";
import Spinner from "./../../../components/UI/Spinner";

class FullPost extends Component {
  state = {
    loadedPost: null,
    postLaoding: false
  };

  deletePostHandler = () => {
    axios.delete("posts/" + this.props.id).then(response => {
      console.log(response);
    });
  };

  componentDidMount(prevProps, prevState) {
    //console.log(this.props);
    if (this.props.match.params.id)
      if (
        !this.state.loadedPost ||
        (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)
      ) {
        this.setState({ postLaoding: true });
        axios
          .get("posts/" + this.props.match.params.id)
          .then(response => {
            this.setState({ loadedPost: response.data });
            this.setState({ postLaoding: true });
          })
          .catch(error => {
            this.setState({ postLaoding: false });
          });
      }
  }

  render() {
    //console.log("ID " + this.props.match.params.id);
    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
    if (this.props.match.params.id)
      post = (
        <div style={{ textAlign: "center" }}>
          <Spinner />
        </div>
      );
    if (this.state.loadedPost) {
      post = (
        <div className="FullPost">
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className="Edit">
            <button className="Delete" onClick={this.deletePostHandler}>
              Delete
            </button>
          </div>
        </div>
      );
    }
    return post;
  }
}

export default FullPost;
