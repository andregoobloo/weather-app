import "./styles.css";

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

const pickCity = async function (city) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=Y848J5XNQTC83DDAR68XQ9VEY`
    );
    const weatherData = await response.json();
    console.log(weatherData);
    console.log(
      `Current Condition: ${weatherData.currentConditions.conditions}`
    );
    console.log(`Icon: ${weatherData.currentConditions.icon}`);
    loadImage(weatherData.currentConditions.icon);
    console.log(`Low of the day: ${weatherData.days[0].tempmin}°F`);
    console.log(`High of the day: ${weatherData.days[0].tempmax}°F`);
    console.log(`Current Temp: ${weatherData.currentConditions.temp}°F`);
    console.log(`Feels like: ${weatherData.currentConditions.feelslike}°F`);
    console.log(`Sunrise: ${weatherData.currentConditions.sunrise}`);
    console.log(`Sunset: ${weatherData.currentConditions.sunset}`);
    console.log(
      `Tomorrows date: ${dayOfWeek(new Date(weatherData.days[1].datetime))}`
    );
    console.log(
      `Tomorrow day/month: ${dayAndMonth(weatherData.days[1].datetime)}`
    );
    console.log(
      `Tomorrows weather description: ${weatherData.days[1].description}`
    );
  } catch (error) {
    console.error(`Whoops! ${err}`);
  }
};

// pickCity("ridgefield, ct");

const loadImage = async function (condition) {
  try {
    const imgIcon = document.querySelector(".weather-icon");
    const icon = await import(`./weather-icons/${condition}.svg`);
    imgIcon.src = icon.default;
    imgIcon.alt = `${condition} icon`;
  } catch (error) {
    console.error(`Image failed to load... ${error}`);
  }
};

const dayOfWeek = function (date) {
  const day = new Date(date);
  return days[day.getUTCDay()];
};

const dayAndMonth = function (date, locale) {
  const day = new Date(date);
  console.log(day);
  const finalDate = day.toLocaleString(locale, {
    month: "short",
    day: "numeric",
    weekday: "long",
  });
  return Date.UTC(finalDate);
};

console.log(dayAndMonth("2024-09-17"));
