import "./styles.css";
import { currentWeather, upcomingDay } from "./display";
import waterDrop from "./weather-icons/water-drop.svg";

const body = document.querySelector(".main-body");
const search = document.querySelector(".search-city");
const searchBar = document.querySelector(".search-bar");

search.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  const input = formData.get("search");
  body.innerHTML = "";
  pickCity(input);
  searchBar.blur();
  search.reset();
});

const pickCity = async function (city) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=Y848J5XNQTC83DDAR68XQ9VEY`
    );

    const weatherData = await response.json();
    console.log(weatherData);

    currentWeather(weatherData);

    const nextTenDays = document.createElement("div");
    nextTenDays.classList.add("upcoming-weather");
    const tenDayTitle = document.createElement("p");
    tenDayTitle.textContent = "10-DAY WEATHER FORECAST";
    tenDayTitle.classList.add("upcoming-weather-title");

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

    body.append(nextTenDays);
    nextTenDays.append(tenDayTitle);

    for (let i = 1; i <= 10; i++) {
      weekAhead(i);
    }
  } catch (error) {
    console.error(`Whoops! ${error}`);
  }
};

// pickCity("omaha");

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
