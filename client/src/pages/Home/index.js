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
          Search all National Parks, Historic Sites, Monuments and Historic
          Trails by State.
          <h6>
            Click on "Save to Favorites" where parks you choose are saved for
            future reference. From there you can view more details of your saved
            items!
          </h6>
        </h6>
      </div>
      {/* <p className="App-intro">
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => logout()}
        >
          Logout
        </button>
      </p> */}
    </div>
  );
}

export default Home;
