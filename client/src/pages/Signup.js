import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import API from "./../utils/API";
import { useAuth } from "../utils/auth";
import background from "../imgs/signup.jpeg";
import "./Home/home.css";
import "./styleHelper.css";

const styles = {
  height: "100%",
  width: "100%",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  border: "1px",
  padding: "110px",
  backgroundImage: `url(${background})`,
};

const titleStyles = {
  marginTop: "5%",
  marginBottom: "3%",
  display: "inline-block",
  fontSize: "1rem",
  fontFamily: "Roboto, Times New Roman, Times, serif",
};

function Signup() {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { isLoggedIn } = useAuth();

  const history = useHistory();

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    API.signUpUser(formState.username, formState.email, formState.password)
      .then((res) => {
        // once the user has signed up
        // send them to the login page
        history.replace("/login");
      })
      .catch((err) => alert(err));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div style={styles} className="App">
      <div styles={titleStyles} className="form-box">
        <h1>Signup</h1>

        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              className="form-control"
              placeholder="Username..."
              name="username"
              type="text"
              id="username"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address:</label>
            <input
              className="form-control"
              placeholder="Email..."
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password:</label>
            <input
              className="form-control"
              placeholder="Password..."
              name="password"
              type="password"
              id="pwd"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <br></br>
        <p>
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
