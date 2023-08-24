import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../API/main";
import Header from "./Header";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log("LOGIN TOKEN", token);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username.length < 1) {
      alert("Your username must be at minimum 5 characters in length");
    } else if (password.length < 1) {
      alert("Your password must be at minimum 8 characters in length");
    } else {
      try {
        const result = await login(username, password);
        localStorage.setItem("token", result.data.token);
        navigate("/profile");
      } catch (error) {
        alert("Username or Password is incorrect, please try again!");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="login_container center">
      <h1>Welcome to Stranger Things!</h1>
      <h2>Please Sign In</h2>
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
      <h3>If dont you already have an account then please sign up!</h3>
      <button className="btn" onClick={() => navigate("/register")}>Sign Up</button>
      </div>
    </>
  );
};
export default Login;
