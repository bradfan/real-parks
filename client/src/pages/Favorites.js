import React, { useState, useCallback } from "react";
import background from "../imgs/fav.jpeg";
import PARKAPI from "../utils/auth/parkAPI/parkAPI";

import axios from "axios";

const styles = {
  minHeight: "100vh",
  width: "100vw",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundImage: `url(${background})`,
  backgroundAttachment: "fixed",
};
const cardStyles = {
  display: "flex",
  flexDirection: "row",
  width: "75%",
  border: "1px solid black",
  borderRadius: "10px",
  opacity: "0.85",
  marginRight: "auto",
  marginLeft: "auto",
  textAlign: "center",
  backgroundColor: "#D3D3D3",
};

function Favorites() {
  const [park, setPark] = useState("");
  const [favoriteParks, setFavoriteParks] = useState([]);

  // add expanded page button and function

  // add delete button and function
  const deleteFav = ((id) => {
    // event.preventDefault();
    PARKAPI.deleteSave(id).then(() => {
      PARKAPI.getParks().then(({ data }) => {
        console.log("favorites:", data);
        setFavoriteParks(data);
      }); 
    })

    console.log("remove button", id);
  });

  React.useEffect(() => {
    PARKAPI.getParks().then(({ data }) => {
      console.log("favorites:", data);
      setFavoriteParks(data);
    });
  }, []);

  return (
    <div style={styles}>
      {favoriteParks.map((favPark) => {
        return (
          <div style={cardStyles} className="card">
            <img
              style={{ width: "400px", height: "400px" }}
              src={favPark.image[0]}
              className="card-img-top"
              alt={favPark.alt}
            />
            <div>
              <div className="card-body">
                <h5 className="card-title"> {favPark.name} </h5>
                <p
                  style={{ backgroundColor: "#D3D3D3" }}
                  className="list-group-item"
                >
                  {favPark.designation}
                </p>
                <p className="card-text">Description: {favPark.description}</p>
              </div>
              <ul className="list-group list-group-flush">
                <li
                  style={{ backgroundColor: "#D3D3D3" }}
                  className="list-group-item"
                >
                  Directions: {favPark.directions}
                </li>
                <li
                  style={{ backgroundColor: "#D3D3D3" }}
                  className="list-group-item"
                >
                  <button
                    className="btn btn-outline-success"
                    type="submit"
                    value={favPark._id}
                    onClick={(event) => {
                      console.log(event.target.value);
                      console.log(favPark);
                      deleteFav(event.target.value);
                    }}
                  >
                    Remove from Favorites
                  </button>
                </li>
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default Favorites;
