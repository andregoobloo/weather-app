import "./styles.css";
import waterDrop from "./weather-icons/water-drop.svg";

// Use array to show 5-day weather forecast underneath current conditions

// const userLocation = navigator.geolocation.getCurrentPosition(function (
//   location
// ) {
//   const latitude = location.coords.latitude;
//   const longitude = location.coords.longitude;

//   fetch(
//     `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?key=Y848J5XNQTC83DDAR68XQ9VEY`
//   )
//
// });

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const body = document.querySelector(".main-body");
const nextTenDays = document.querySelector(".upcoming-weather");

const pickCity = async function (city) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=Y848J5XNQTC83DDAR68XQ9VEY`
    );
    const weatherData = await response.json();
    console.log(weatherData);

    const content = `<div class="current-weather">
          <div class="current-weather-header">${weatherData.resolvedAddress} at ${weatherData.currentConditions.datetime}</div>
          <div class="current-weather-data">
            <h1>${weatherData.currentConditions.temp}°F</h1>
            <h5>Feels like: ${weatherData.currentConditions.feelslike}°F</h5>
            <p>${weatherData.currentConditions.conditions}</p>
            <p>High ${weatherData.days[0].tempmax}°F - Low ${weatherData.days[0].tempmin}°F</p>
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

    const weekAhead = async function (i) {
      const upcomingDay = `<div class="upcoming-day">
                <div class="upcoming-weather-date">
                  <p class="upcoming-day-weekday">
                  ${dayOfWeek(weatherData.days[i].datetime)}
                    <span>${dayAndMonth(weatherData.days[i].datetime)}</span>
                  </p>
                </div>
                <p class="upcoming-weather-temp">${
                  weatherData.days[i].tempmax
                }°F/<span>${weatherData.days[i].tempmin}°F</span></p>
                <img
                  src="#"
                  alt=""
                  class="upcoming-day-img-${i}"
                />
                <div class="precip-probability">
                  <img
                    src= ${waterDrop}
                    alt="precipitation chance icon"
                    class="precip-chance"
                  />
                  <p>${weatherData.days[i].precipprob}%</p>
                </div>`;

      nextTenDays.insertAdjacentHTML("beforeend", upcomingDay);
      loadImage(weatherData.days[i].icon, `.upcoming-day-img-${i}`);
    };

    for (let i = 1; i <= 10; i++) {
      weekAhead(i);
    }
  } catch (error) {
    console.error(`Whoops! ${err}`);
  }
};

pickCity("omaha");

const loadImage = async function (condition, imgClass) {
  try {
    const imgIcon = document.querySelector(imgClass);
    const icon = await import(`./weather-icons/${condition}.svg`);
    imgIcon.src = icon.default;
    imgIcon.alt = `${condition} icon`;
  } catch (error) {
    console.error(`Image failed to load... ${error}`);
  }
};

const dayOfWeek = function (date, locale) {
  const day = new Date(`${date}T00:00`);
  const dayOfWeek = day.toLocaleString(locale, { weekday: "short" });
  return dayOfWeek;
};

const dayAndMonth = function (date, locale) {
  const day = new Date(`${date}T00:00`);
  const finalDate = day.toLocaleString(locale, {
    month: "short",
    day: "numeric",
  });
  return finalDate;
};
