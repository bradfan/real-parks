import React, { useEffect, useState, useCallback } from "react";
import { api_key } from "../api.json";
import background from "../imgs/weather2.jpeg";
import { useParams } from "react-router-dom";
import PARKAPI from "../utils/auth/parkAPI/parkAPI";

const styles = {
  width: "100vw",
  minHeight: "100vh",
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
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

function Expanded() {
  const [weatherResponse, setWeatherResponse] = useState({});
  const [park, setPark] = useState("");
  const [view, setView] = useState("");
  let params = useParams();
  console.log("parkId:", params);

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

  useEffect(() => {
    PARKAPI.getView().then(({ data }) => {
      console.log("view:", data);
      setView(data);
    });
  }, []);

  // const viewPark = (id) => {
  //   PARKAPI.getView(id).then(() => {
  //     console.log("view one:", id);
  //     setView(id);
  //   });
  // };

  return (
    <div style={styles}>
      <div style={cardStyles} className="card">
        <img
          // style={{ width: "100px", height: "100px" }}
          src=""
          className="card-img-top"
          alt=""
        />
        {/* <img
          style={{ width: "100px", height: "100px" }}
          src={props.image}
          className="card-img-top"
          alt={props.name}
        />
        <img
          style={{ width: "100px", height: "100px" }}
          src={props.image}
          className="card-img-top"
          alt={props.name}
        /> */}
        <div>
          <div className="card-body">
            <h5 className="card-title">Name: {params.name}</h5>
            <p className="card-text">A Detailed Look</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Phone: ""</li>
            <li className="list-group-item">email: ""</li>
            <li className="list-group-item">DOB: ""</li>
            <button
              className="btn btn-outline-success"
              type="submit"
              // value={favPark.city}
              onClick={(event) => {
                console.log(event.target.value);
                onSubmit(event);
                provideData(event);
              }}
            >
              Check the weather forecast for this park!
            </button>
          </ul>
        </div>
      </div>
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

export default Expanded;
