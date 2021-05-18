import axios from "axios";
import API_KEYS from "../../../api.json";

function getAuthToken() {
  return localStorage.getItem("id_token");
}

export default {
  // Gets all titles or whatever the object supplies - be sure to call argument
  getpark: function (title) {
    return axios.get(
      `https://parkapi-parkapi.p.rapidapi.com/park/map/%7Bid%7D/gpx/`,
      {
        headers: {
          "x-rapidapi-key": API_KEYS.park_api_key,
          "x-rapidapi-host": "parkapi-parkapi.p.rapidapi.com",
        },
      }
    );
  },
  // Saves a park to the database
  handleSave: function (parkToSave) {
    return axios.post("/api/parks/", parkToSave, {
      authorization: getAuthToken(),
    });
  },
  // Deletes the park with the given id
  deleteSave: function (id) {
    return axios.delete("/api/parks/" + id);
  },
  getParks() {
    return axios.get("/api/parks", {
      authorization: getAuthToken(),
    });
  },
};
