import { loadImage, dayAndMonth, dayOfWeek } from "./helper";

export const currentWeather = function (weatherData) {
  const body = document.querySelector(".main-body");
  const content = `<div class="current-weather">
          <div class="current-weather-header">${weatherData.resolvedAddress} at ${weatherData.currentConditions.datetime}</div>
          <div class="current-weather-data">
            <h1>${weatherData.currentConditions.temp}°F</h1>
            <h5>Feels like: ${weatherData.currentConditions.feelslike}°F</h5>
            <p>${weatherData.currentConditions.conditions}</p>
            <p class="high-low-temps">${weatherData.days[0].tempmax}°F/<span>${weatherData.days[0].tempmin}°F</span></p>
          </div>
          <img
            src="#"
            alt=""
            class="current-weather-icon"
          />
          <div class="current-weather-other-data">
            <p>Humidity: ${weatherData.currentConditions.humidity}%</p>
            <p>Dew point: ${weatherData.currentConditions.dew}°F</p>
            <p>Visibility: ${weatherData.currentConditions.visibility} mi</p>
          </div>
          <div class="current-weather-other-data-2">
            <p>Wind: ${weatherData.currentConditions.windspeed} mph</p>
            <p>Sunrise: ${weatherData.currentConditions.sunrise}</p>
            <p>Sunset: ${weatherData.currentConditions.sunset}</p>
          </div>
        </div>`;

  body.insertAdjacentHTML("afterbegin", content);
  loadImage(weatherData.currentConditions.icon, ".current-weather-icon");
};

// Display Current Location

// const displayCurrentLocation = async function (position) {
//   try {
//     const response = await fetch(
//       `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${position.coords.latitude},${position.coords.longitude}?key=Y848J5XNQTC83DDAR68XQ9VEY`
//     );
//     const weatherData = await response.json();
//     console.log(weatherData);
//     currentWeather(weatherData);
//   } catch (error) {
//     console.log(error);
//   }
// };
// const currentLocation = function () {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function (position) {
//       displayCurrentLocation(position);
//     });
//   } else {
//     console.log("Geolocation is not supported by this browser.");
//   }
// };
