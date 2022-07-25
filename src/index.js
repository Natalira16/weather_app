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

function displayWeather(response) {
    let temperature = Math.round(response.data.main.temp);

    document.querySelector("h1").innerHTML = response.data.name;
    document.querySelector("h3").innerHTML = temperature;

    document.querySelector("#feels_like").innerHTML = Math.round(response.data.main.feels_like);
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind_speed").innerHTML = Math.round(response.data.wind.speed);

    document.querySelector("#description").innerHTML = response.data.weather[0].main;

    document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon
        }@2x.png`);
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



// ------------------------------------------------------ //

function currentCTemp(event) {
    event.preventDefault();

    let temperature = document.querySelector("h3");
    let celsiusTemperature = Math.round(temperature);

    let h3 = document.querySelector("h3");
    h3.innerHTML = `${celsiusTemperature}`;

    // let temp = document.querySelector("h3#temperature");
    // temp.classList.add("hide-temp");
    // temp.classList.remove("show-temp");
}

let buttonC = document.querySelector("#celsius-btn");
buttonC.addEventListener("click", currentCTemp);



function currentFTemp(event) {
    event.preventDefault();

    let temperature = document.querySelector("h3");
    // let h3 = Math.round(response.data.main.temp);
    let fahrenheitTemperature = Math.round((temperature * 9) / 5 + 32);

    h3 = document.querySelector("h3");
    h3.innerHTML = `${fahrenheitTemperature}`;

    // let temp = document.querySelector("h3#temperature2");
    // temp.classList.add("show-temp");
    // temp.classList.remove("hide-temp");
}

let buttonF = document.querySelector("#fahrenheit-btn");
buttonF.addEventListener("click", currentFTemp);
