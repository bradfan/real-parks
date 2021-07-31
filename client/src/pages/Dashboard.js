import React, { useState, useEffect, useCallback } from "react";
import API from "./../utils/API";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/auth";
import { api_key } from "../api.json";
import { park_api_key } from "../api.json";
import background from "../imgs/weather.jpeg";
import PARKAPI from "../utils/auth/parkAPI/parkAPI";
import ParkInfo from "../components/ParkInfo";
import Context from "../utils/Context";

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

function Dashboard() {
  const [city, setCity] = useState("");
  const { user } = useAuth();
  const [test, setTest] = useState({ data: [] });

  const getPark = () => {
    const parkURL = `https://developer.nps.gov/api/v1/parks?parkCode=&stateCode=${city}&stateCode&api_key=${park_api_key}`;
    console.log("parkURL: ", parkURL);
    // fetch data from the URL, resolve to json
    fetch(parkURL)
      .then((res) => res.json())
      .then((data) => {
        console.log("data:", data);
        setTest({ data: data.data });
        console.log("test:", test);
      });
  };
  //  recieves input from user and assigns text to value and sets state
  const handleInputChange = (event) => {
    const val = event.target.value;
    setCity(val);
    console.log("city:", city);
  };
    // fulfills handleSubmit from button, check to see if UseCallBack is correct here-app is functional with it
  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    console.log("city:", city);

    getPark();
  });

  // add expanded page button and function

  const saveInput = (data) => {
    console.log("save input button clicked");
    PARKAPI.handleSave({
      name: data.name,
      description: data.description,
      directions: data.directionsInfo,
      designation: data.designation,
      city: data.addresses[0].city,
      image0: data.images[0].url,
      image1: data.images[1].url,
      image2: data.images[2].url,
      image3: data.images[3].url,
      alt0: data.images[0].altText,
      alt1: data.images[1].altText,
      alt2: data.images[2].altText,
      alt3: data.images[3].altText,
      activity0: data.activities[0].name,
      activity1: data.activities[1].name,
      activity2: data.activities[2].name,
      activity3: data.activities[3].name,
      activity4: data.activities[4].name,
      weather: data.weatherInfo,
      topic0: data.topics[0].name,
      topic1: data.topics[1].name,
      topic2: data.topics[2].name,
      phone: data.contacts.phoneNumbers[0].phoneNumber,
      email: data.contacts.emailAddresses[0].emailAddress,
      zip: data.addresses[0].postalCode
    }).then((response) => {
      console.log("response:", response);
      if (response.data === "Already Saved!") {
        alert("Already Saved as a Favorite!");
      } else {
        alert("Saved to Favorites!");
      }
    });
  };

  return (
    <div style={styles}>
      <div>
        <input
          style={{ width: "25vw" }}
          value={city}
          onChange={handleInputChange}
          name="text"
          className="form-control me-2"
          type="text"
          placeholder="Enter State Code Here (AZ, TX, etc.)"
          aria-label="Search"
        />
        <button
          //  submit button
          // style={cardStyles}
          className="btn btn-outline-success"
          type="submit"
          onClick={(event) => {
            console.log(event.target.value);
            handleSubmit(event);
          }}
        >
          Submit
        </button>
      </div>

      {test.data
        ? test.data.map((obj) => {
            const activities = obj.activities.map((act) => {
              return act.name;
            });
            const images = obj.images.map((img) => {
              return img.url;
            });
            const topics = obj.topics.map((topic) => {
              return topic.name;
            });

            return (
              /* add card styles to the below div */
              <div style={cardStyles} className="card">
                <div>
                  {images.slice(0, 4).map((image) => {
                    return (
                      <img
                        style={{
                          width: "200px",
                          height: "200px",
                          padding: "10px",
                        }}
                        src={image}
                        className="card-img-top"
                        // alt={obj.images[0].altText}
                      />
                    );
                  })}
                </div>
                <div>
                  <div className="card-body">
                    <strong>
                      <h3 className="card-title"> {obj.name} </h3>
                    </strong>
                    <strong>
                      <p
                        style={{ backgroundColor: "#D3D3D3" }}
                        className="list-group-item"
                      >
                        {obj.designation}
                      </p>
                    </strong>

                    <p className="card-text">
                      <strong>Description:</strong> {obj.description}
                    </p>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li
                      style={{ backgroundColor: "#D3D3D3" }}
                      className="list-group-item"
                    >
                      <strong>Activities:</strong> {activities.join(", ")}
                    </li>
                    <li
                      style={{ backgroundColor: "#D3D3D3" }}
                      className="list-group-item"
                    >
                      <strong>What to expect from the weather:</strong>{" "}
                      {obj.weatherInfo}
                    </li>
                    <li
                      style={{ backgroundColor: "#D3D3D3" }}
                      className="list-group-item"
                    >
                      <strong>What this site is known for:</strong>{" "}
                      {topics.join(", ")}
                    </li>
                    <li
                      style={{ backgroundColor: "#D3D3D3" }}
                      className="list-group-item"
                    >
                      <strong>Directions:</strong> {obj.directionsInfo}
                    </li>
                    <li
                      style={{ backgroundColor: "#D3D3D3" }}
                      className="list-group-item"
                    >
                      <strong>Contact Info:</strong>

                      <p>
                        <strong>Phone:</strong>
                        {obj.contacts.phoneNumbers[0].phoneNumber}
                      </p>
                      <p>
                        <strong>email:</strong>
                        {obj.contacts.emailAddresses[0].emailAddress}
                      </p>
                    </li>

                    <li
                      style={{ backgroundColor: "#D3D3D3" }}
                      className="list-group-item"
                    >
                      <button
                        className="btn btn-outline-success"
                        type="submit"
                        onClick={(event) => {
                          console.log(event.target.value);
                          saveInput(obj);
                        }}
                      >
                        Save as Favorite!
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            );
          })
        : " "}
    </div>
  );
}

export default Dashboard;
