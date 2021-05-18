import React, { useState, useCallback } from "react";
import background from "../imgs/fav.jpeg";
import PARKAPI from "../utils/auth/trailAPI/trailAPI";
import { api_key } from "../api.json";
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
const weatherStyles = {
  borderRadius: "100px",
  color: "#1028F2",
  fontWeight: "bold",
  borderWidth: "50px",
  display: "flex",
  margin: "40px",
  border: "5px black",
};

function Favorites() {
  const [park, setPark] = useState("");
  const [weatherResponse, setWeatherResponse] = useState({});
  const [favoriteParks, setFavoriteParks] = useState([]);

  const getParkWeather = () => {
    const weatherURL = `http://api.openweathermap.org/data/2.5/forecast?q=${park}&units=imperial&APPID=${api_key}`;
    fetch(weatherURL)
      .then((res) => res.json())
      .then((data) => {
        console.log("weather:", data);
        setWeatherResponse(data);
      });
  };
  //   still need to figure out how the weatherurl will recieve it's data
  const provideData = (event) => {
    const val = event.target.value;
    setPark(val);
    console.log("park data:", park);
  };

  const onSubmit = useCallback((event) => {
    event.preventDefault();
    console.log("park:", park);
    getParkWeather();
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
                    value={favPark.city}
                    onClick={(event) => {
                      console.log(event.target.value);
                      onSubmit(event);
                      provideData(event);
                    }}
                  >
                    Check the weather forecast for this park!
                  </button>
                </li>
              </ul>
            </div>
          </div>
        );
      })}

      <div style={weatherStyles}>
        {weatherResponse.list
          ? weatherResponse.list.map((weatherItem, idx) => {
              if (idx % 8 === 4) {
                return (
                  // forecast card
                  <div key={idx} style={cardStyles}>
                    <p>Date: {weatherResponse?.list[idx]?.dt_txt}</p>

                    <p>
                      Temperature: {weatherResponse?.list[idx]?.main?.temp} F
                    </p>

                    <p>
                      Humidity: {weatherResponse?.list[idx]?.main?.humidity}%
                    </p>
                  </div>
                );
              }
            })
          : ""}
      </div>
    </div>
  );
}
export default Favorites;
