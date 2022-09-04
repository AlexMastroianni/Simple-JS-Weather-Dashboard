var citySearch = [];
var seachHistory = "";
var userCity = document.querySelector("#cityName");

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
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to database");
    });
};

// Temp == main.feels_like

var showWeather = function (weatherData) {
  $("#cityTemp").text(
    "Temperature: " + weatherData.main.temp.toFixed(1) + "°C"
  );
};

let searchHandler = function (event) {
  event.preventDefault();
  let userInput = userCity.value;
  console.log(userInput);
  console.log("userInput");
  if (userInput) {
    getWeather(userInput);
  } else {
    alert("Please enter a city name");
  }
};

$("#searchBtn").on("click", searchHandler);
