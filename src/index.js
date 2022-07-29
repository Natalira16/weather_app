function formatDate(i) {
    if (i < 10) { i = "0" + i }
    return i;
}

let date = new Date();

let h2 = document.querySelector("h2");

let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
let currentDay = days[date.getDay()];

let hours = formatDate(date.getHours());
let minutes = formatDate(date.getMinutes());

h2.innerHTML = `${currentDay} ${hours}:${minutes}`;



// ------------------------------------------------------ //

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
}

function displayForecast(response) {
    let forecast = response.data.daily;

    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;
    forecast.forEach(function (forecastDay, index) {
        if (index < 6) {
            forecastHTML =
                forecastHTML +
                `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon
                }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
                    forecastDay.temp.max
                )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
                    forecastDay.temp.min
                )}° </span>
        </div>
      </div>
  `;
        }
    });

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "c9470fa529ce6770f386cc31e17d6a25";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}


// ------------------------------------------------------ //

function displayWeather(response) {
    let temperature = Math.round(response.data.main.temp);

    tempC = response.data.main.temp;

    document.querySelector("h1").innerHTML = response.data.name;
    document.querySelector("h3").innerHTML = temperature;

    document.querySelector("#feels_like").innerHTML = Math.round(response.data.main.feels_like);
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind_speed").innerHTML = Math.round(response.data.wind.speed);

    document.querySelector("#description").innerHTML = response.data.weather[0].main;

    let iconElementAPI = response.data.weather[0].icon;
    // document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${iconElementAPI}@2x.png`);

    if (iconElementAPI === "01d") {
        document.querySelector("#icon").setAttribute("src", `./Images/Icons/01d.svg`);
    } else if (iconElementAPI === "02d") {
        document.querySelector("#icon").setAttribute("src", `./Images/Icons/02d.svg`);
    } else if (iconElementAPI === "03d") {
        document.querySelector("#icon").setAttribute("src", `./Images/Icons/03d.svg`);
    } else if (iconElementAPI === "04d") {
        document.querySelector("#icon").setAttribute("src", `./Images/Icons/04d.svg`);
    } else if (iconElementAPI === "09d") {
        document.querySelector("#icon").setAttribute("src", `./Images/Icons/09d.svg`);
    } else if (iconElementAPI === "10d") {
        document.querySelector("#icon").setAttribute("src", `./Images/Icons/10d.svg`);
    } else if (iconElementAPI === "11d") {
        document.querySelector("#icon").setAttribute("src", `./Images/Icons/11d.svg`);
    } else if (iconElementAPI === "13d") {
        document.querySelector("#icon").setAttribute("src", `./Images/Icons/13d.svg`);
    } else if (iconElementAPI === "50d") {
        document.querySelector("#icon").setAttribute("src", `./Images/Icons/50d.svg`);
    } else if (iconElementAPI === "01n") {
        document.querySelector("#icon").setAttribute("src", `./Images/Icons/01n.svg`);
    } else if (iconElementAPI === "02n") {
        document.querySelector("#icon").setAttribute("src", `./Images/Icons/02n.svg`);
    } else if (iconElementAPI === "03n") {
        document.querySelector("#icon").setAttribute("src", `./Images/Icons/03n.svg`);
    } else if (iconElementAPI === "04n") {
        document.querySelector("#icon").setAttribute("src", `./Images/Icons/04n.svg`);
    } else if (iconElementAPI === "09n") {
        document.querySelector("#icon").setAttribute("src", `./Images/Icons/09n.svg`);
    } else if (iconElementAPI === "10n") {
        document.querySelector("#icon").setAttribute("src", `./Images/Icons/10n.svg`);
    } else if (iconElementAPI === "11n") {
        document.querySelector("#icon").setAttribute("src", `./Images/Icons/11n.svg`);
    } else if (iconElementAPI === "13n") {
        document.querySelector("#icon").setAttribute("src", `./Images/Icons/13n.svg`);
    } else if (iconElementAPI === "50n") {
        document.querySelector("#icon").setAttribute("src", `./Images/Icons/50n.svg`);
    }

    document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
    let apiKey = "c9470fa529ce6770f386cc31e17d6a25";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#form-control").value;
    searchCity(city);
}

function searchLocation(position) {
    let apiKey = "c9470fa529ce6770f386cc31e17d6a25";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}

let button = document.querySelector("#btn-search");
button.addEventListener("click", handleSubmit);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#btn-current");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Kyiv");


// ------------------------------------------------------ //

function currentCTemp(event) {
    event.preventDefault();

    let temperature = document.querySelector("h3");
    let celsiusTemperature = Math.round(tempC);

    let h3 = document.querySelector("h3");
    h3.innerHTML = `${celsiusTemperature}`;

    buttonF.classList.remove("active");
    buttonC.classList.add("active");
}

let buttonC = document.querySelector("#celsius-btn");
buttonC.addEventListener("click", currentCTemp);



function currentFTemp(event) {
    event.preventDefault();

    let temperature = document.querySelector("h3");
    let fahrenheitTemperature = Math.round((tempC * 9) / 5 + 32);

    h3 = document.querySelector("h3");
    h3.innerHTML = `${fahrenheitTemperature}`;

    buttonC.classList.remove("active");
    buttonF.classList.add("active");
}

let tempC = null;

let buttonF = document.querySelector("#fahrenheit-btn");
buttonF.addEventListener("click", currentFTemp);