import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useAuth } from "../utils/auth";
import background from "../imgs/login.jpeg";
import "./Home/home.css";
import "./styleHelper.css";

const styles = {
  height: "100%",
  width: "100%",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
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

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn, login } = useAuth();
  const history = useHistory();

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();

    login(email, password)
      // navigate to the profile page
      .then(() => history.push("/"))
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <div style={styles} className="App">
      <div style={titleStyles} className="form-box">
        <h1>Login</h1>

        <form onSubmit={handleFormSubmit}>
          <div class="form-group">
            <label htmlFor="email">Email address:</label>
            <input
              className="form-control"
              placeholder="Email..."
              name="email"
              type="email"
              id="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
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
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <br></br>
        <p class="signup-button">
          <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
