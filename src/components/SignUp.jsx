import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../API/main";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("username", username);
    if (username.length < 6) {
      alert("Your username must be at minimum 6 characters in length");
    } else if (password.length < 8) {
      alert("Your password must be at minimum 8 characters in length");
    } else {
      try {
        const result = await registerUser(username, password);
        localStorage.setItem("token", result.data.token);
        const token = localStorage.getItem("token");
        navigate("/profile");
      } catch (error) {
        alert("User already exists, please login instead!");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="login_container center">
      <h1>Welcome to Stranger Things!</h1>
      <h2> Please Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label value={username} onChange={(e) => setUsername(e.target.value)}>
          Username: <input />
        </label>
        <br></br>
        <label value={password} onChange={(e) => setPassword(e.target.value)}>
          Password: <input />
        </label>
        <br></br>
        <button className="btn">Submit</button>
      </form>
      <h3>If you already have an account then use the login!</h3>
      <button className="btn" onClick={() => navigate("/login")}>Log In</button>
      </div>
    </>
  );
};
export default SignUp;
