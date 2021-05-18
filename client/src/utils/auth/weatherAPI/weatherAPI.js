import React from "react";
import axios from "axios";
import { api_key } from "../../../api.json";

export default {
  // Gets weather based on city
  getWeather: function (city) {
    console.log("apiKey:", api_key);
    console.log("city:", city);
    return axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=imperial`
    );
  },
};
