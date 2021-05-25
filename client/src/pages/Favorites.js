import React, { useState, useCallback } from "react";
import background from "../imgs/fav.jpeg";
import PARKAPI from "../utils/auth/parkAPI/parkAPI";
import { Link } from "react-router-dom";

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

  const deleteFav = (id) => {
    PARKAPI.deleteSave(id).then(() => {
      PARKAPI.getParks().then(({ data }) => {
        console.log("favorites:", data);
        setFavoriteParks(data);
      });
    });

    console.log("remove button", id);
  };

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
            <div>
              <img
                style={{ width: "200px", height: "200px", padding: "10px" }}
                src={favPark.image0[0]}
                className="card-img-top"
                alt={favPark.alt0}
              />
              <img
                style={{ width: "200px", height: "200px", padding: "10px" }}
                src={favPark.image1[0]}
                className="card-img-top"
                alt={favPark.alt1}
              />
              <img
                style={{ width: "200px", height: "200px", padding: "10px" }}
                src={favPark.image2[0]}
                className="card-img-top"
                alt={favPark.alt2}
              />
              <img
                style={{ width: "200px", height: "200px", padding: "10px" }}
                src={favPark.image3[0]}
                className="card-img-top"
                alt={favPark.alt3}
              />
            </div>
            <div>
              <div className="card-body">
               <strong><h3 className="card-title"> {favPark.name} </h3></strong> 
            <strong><p
                  style={{ backgroundColor: "#D3D3D3" }}
                  className="list-group-item"
                >
                  {favPark.designation}
                </p></strong> 
                <p className="card-text"><strong>Description:</strong> {favPark.description}</p>
              </div>
              <ul className="list-group list-group-flush">
                
                <li
                  style={{ backgroundColor: "#D3D3D3" }}
                  className="list-group-item"
                >
                  {/* <Link to={`/Expanded/${favPark._id}`}>
                    <button className="btn btn-outline-success" type="submit">
                      Click to see more details of this park
                    </button>
                  </Link> */}
                  <li
                    style={{ backgroundColor: "#D3D3D3" }}
                    className="list-group-item"
                  >
                    <strong>Activities:</strong> {favPark.activity0}, {favPark.activity1}, {favPark.activity2}, {favPark.activity3} and {favPark.activity4}
                  </li>
                  <li
                    style={{ backgroundColor: "#D3D3D3" }}
                    className="list-group-item"
                  >
                    <strong>What to expect from the weather:</strong> {favPark.weather}
                  </li>
                  <li
                    style={{ backgroundColor: "#D3D3D3" }}
                    className="list-group-item"
                  >
                    <strong>What this site is known for:</strong> {favPark.topic0}, {favPark.topic1} and {favPark.topic2}
                  </li>
                   <li
                    style={{ backgroundColor: "#D3D3D3" }}
                    className="list-group-item"
                  >
                    <li
                  style={{ backgroundColor: "#D3D3D3" }}
                  className="list-group-item" >
              <strong>Directions:</strong> {favPark.directions}
                </li>
                    <strong>Contact Info:</strong>

                    <p>
                      <strong>Phone:</strong> {favPark.phone}
                    </p>
                    <p>
                      <strong>email:</strong> {favPark.email}
                    </p>
                  </li>
                  <button
                    className="btn btn-outline-success"
                    type="submit"
                    value={favPark._id}
                    onClick={(event) => {
                      deleteFav(event.target.value);
                      alert("Removed from Favorites!!");
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
