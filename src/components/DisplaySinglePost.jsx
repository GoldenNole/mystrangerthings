import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deletePost, fetchPosts, postMessage } from "../API/main";
import { useParams } from "react-router-dom";
import Header from "./Header";

/*
{token && post.isAuthor && (
            <button className="btn" onClick={() => navigate(`/editpost`)}>Edit</button>
          )}
  */

const DisplaySinglePost = () => {
  const [post, setPost] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const { postId } = useParams();
  const navigate = useNavigate();

  async function getAllPosts() {
    const response = await fetchPosts();
    const posts = response.data.posts;
    const filteredPosts = posts.filter(post => {
      return post._id.includes(postId);
    });
    setPost(filteredPosts);
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  async function handleMessage() {
    try {
      const result = await postMessage(postId, message);
      navigate(`/`);
    } catch (error) {
      console.error(error);
    }
  }
 
  async function handleDelete(postId) {
    try {
      const result = await deletePost(postId);
      console.log("Delete", result);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Header />
      <div className="main-container">
      {post.map((post) => (
        <div key={post._id}>
          <div className="container">
          <h1>{post.title}</h1>
          <h4>Posted by: {post.author.username}</h4>
          <h3>{post.description}</h3>
          <h3>Asking Price: {post.price}</h3>
          <h3>Location: {post.location}</h3>
          <h3>Will Deliver: {post.willDeliver ? "Yes" : "No"}</h3>
          <br></br>
          {token && post.isAuthor && (
            <button className="delete-btn" onClick={() => handleDelete(post._id)}>Delete</button>
          )}
          </div>
          {token && !post.isAuthor && (
            <div className="container">
              <h2>Leave a Message</h2>
              <form>
                  <input
                    value={message}
                    type="text"
                    name="message"
                    placeholder="Message"
                    onChange={(e) => setMessage(e.target.value)}
                  />
              </form>
              <button className="btn" onClick={() => handleMessage()}>
                Submit
              </button>
            </div>
          )}
          {token && post.isAuthor && (
            <div>
          <h1>Messages</h1>
          {post.messages.map((message) => (
            <div className="container" key={message._id}>
              <h2>{message.fromUser.username}</h2>
              <h3>{message.content}</h3>
            </div>
          ))} 
          </div>)}
        </div>
      ))}
      <button className="btn" onClick={() => navigate(`/`)}> Back to Posts</button>
      </div>
    </div>
  );
}

export default DisplaySinglePost;