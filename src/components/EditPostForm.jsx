import { updatePost } from "../API/main";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const EditPostForm = (post) => {
  const navigate = useNavigate();
  

  async function handleUpdate() {
    try {
      const result = await updatePost(postId);
      console.log("Update", result);
      navigate("/posts");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="container">
      <button onClick={handleUpdate}>Edit Post</button>
           <h1>{post.title}</h1>
          <h3>{post.description}</h3>
          <h3>Asking Price: {post.price}</h3>
          <h3>Location: {post.location}</h3>
          <h3>Will Deliver: {post.willDeliver ? "Yes" : "No"}</h3>

      <h1> Add New Post </h1>
      <form onSubmit={handleUpdate}>
        <label> Title:
          <input
            value={title}
            type="text"
            name="title"
            placeholder="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br></br>
        <label> Description:
          <input
            value={description}
            type="text"
            name="description"
            placeholder="description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br></br>
        <label> Price:
          <input
            value={price}
            type="text"
            name="price"
            placeholder="price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <br></br>
        <label> Loaction:
          <input
            value={location}
            type="text"
            name="location"
            placeholder="location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <br></br>
        <label> Will Deliver:
          <input
            value={deliver}
            type="checkbox"
            name="deliver"
            onChange={(e) => setDeliver(!deliver)} />
        </label>
        <br></br>
        <button>Submit</button>
      </form>
    </div>

  );
};

export default EditPostForm;
