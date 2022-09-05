var citySearch = [];
var userSearchHistory = "";
var currentCity;
var searchList = document.querySelector("#searchList");
var userCity = document.querySelector("#cityName");
var userSearchHistory =
  JSON.parse(window.localStorage.getItem("weatherSearchHistory")) || [];

var getWeather = function (city) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=838ac9624152c68b6dec47d980282426&units=metric";
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          showWeather(data);
          console.log(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to database");
    });
};

// Need to work on getting the UV radiation + the 5 Day forcast
let showWeather = function (weatherData) {
  $("#cityTemp").text("Temperature: " + weatherData.main.temp + "°C");
  $("#cityHum").text("Humidity: " + weatherData.main.humidity + "%");
  $("#cityWind").text("Wind: " + weatherData.wind.speed + "m/s");

  //   fetch(
  //     "https://api.openweathermap.org/data/2.5/forecast?q=" +
  //       weatherData.name +
  //       "&appid=838ac9624152c68b6dec47d9802824266"
  //   ).then(function (response) {
  //     response.json().then(function (data) {
  //       console.log(data);
  //     });
  //   });
};

let searchHandler = function (event) {
  event.preventDefault();
  let userInput = userCity.value;

  if (userInput) {
    getWeather(userInput);
    var userSearchHistory = userCity.value;
    citySearch.push(userSearchHistory);
    localStorage.setItem("searchHistory", JSON.stringify(citySearch));
    for (var i = 0; i < citySearch.length; i++) {
      var li = document.createElement("li");
      li.setAttribute("data-index", i);
      li.textContent = citySearch[i];
      searchList.appendChild(li);
    }
  } else {
    alert("Please enter a city name");
  }
};

$("#searchBtn").on("click", searchHandler);
