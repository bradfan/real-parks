import React from "react";
import { useHistory } from "react-router-dom";
import background from "../../imgs/home.jpeg";

import "./home.css";
import { useAuth } from "../../utils/auth";

function Home() {
  const { user, logout } = useAuth();
  const history = useHistory();

  const styles = {
    height: "100vh",
    width: "100vw",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundImage: `url(${background})`,
  };
  const titleStyles = {
    backgroundSize: "cover",
    display: "center",
    backgroundColor: "#4D6241",
    marginTop: "15%",
    marginBottom: "3%",
    listStyleType: "none",
    display: "inline-block",
    fontSize: "1rem",
    borderRadius: "50px",
    fontFamily: "Roboto, Times New Roman, Times, serif",
  };

  return (
    <div style={styles} className="App">
      <div style={titleStyles} className="App-header">
        <h1>Welcome to Parkify</h1>
        <h6>
          To find a national park you desire to explore by the state of your
          choice please click on the dashboard.
          <h6>
            After exploring you can list your favorites to refer back to later
            on by clicking the favorites tab.
          </h6>
        </h6>
      </div>
      <p className="App-intro">
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => logout()}
        >
          Logout
        </button>
      </p>
    </div>
  );
}

export default Home;
