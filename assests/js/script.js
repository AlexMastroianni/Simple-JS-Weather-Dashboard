let citySearch = [];
const searchListEL = document.querySelector("#searchList");
const userCityEl = document.querySelector("#cityName");
let searchHistory = JSON.parse(window.localStorage.getItem("searchList")) || [];

let getWeather = function (city) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=838ac9624152c68b6dec47d980282426&units=metric";
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          showWeather(data);
          getForcast(data);
          getUV(data);
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
let getForcast = function (weatherData) {
  var forCastURl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    weatherData.name +
    "&appid=838ac9624152c68b6dec47d980282426&units=metric";
  fetch(forCastURl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          showForcast(data);
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
let showWeather = function (weatherData) {
  $("#cityTemp").text("Temperature: " + weatherData.main.temp + "°C");
  $("#cityHum").text("Humidity: " + weatherData.main.humidity + "%");
  $("#cityWind").text("WindSpeed: " + weatherData.wind.speed + "ms");
  $("#cityHum").text("Humidity: " + weatherData.main.humidity + "%");
};
let showForcast = function (forcastData) {
  $("#day1Temp").text("Temperature: " + forcastData.list[0].main.temp + "°C");
  $("#day1Hum").text("Humidity: " + forcastData.list[0].main.humidity + "%");
  $("#day1Wind").text("WindSpeed: " + forcastData.list[0].wind.speed + "ms");
  $("#day1UV").text("Humidity: " + forcastData.list[0].main.humidity + "%");

  $("#day2Temp").text("Temperature: " + forcastData.list[1].main.temp + "°C");
  $("#day2Hum").text("Humidity: " + forcastData.list[1].main.humidity + "%");
  $("#day2Wind").text("WindSpeed: " + forcastData.list[1].wind.speed + "ms");
  $("#day2UV").text("Humidity: " + forcastData.list[1].main.humidity + "%");

  $("#day3Temp").text("Temperature: " + forcastData.list[2].main.temp + "°C");
  $("#day3Hum").text("Humidity: " + forcastData.list[2].main.humidity + "%");
  $("#day3Wind").text("WindSpeed: " + forcastData.list[2].wind.speed + "ms");
  $("#day3UV").text("Humidity: " + forcastData.list[2].main.humidity + "%");
};

let getUV = function (weatherData) {
  let UVUrl =
    "https://api.openweathermap.org/data/2.5/uvi?lat=" +
    weatherData.coord.lat +
    "&lon=" +
    weatherData.coord.lon +
    "&appid=838ac9624152c68b6dec47d980282426&units=metric";

  fetch(UVUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          // showUV(data);
          console.log("UV data", data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to database");
    });
};

// let showUV = function (UVData) {
//   $("#day1UV").text("Humidity: " + UVData.list[0].main.humidity + "%");
//   $("#day2UV").text("Humidity: " + UVData.list[1].main.humidity + "%");
//   $("#day3UV").text("Humidity: " + UVData.list[2].main.humidity + "%");
// };

let searchHandler = function (event) {
  event.preventDefault();
  let userInput = userCityEl.value;

  if (userInput) {
    getWeather(userInput);
    let citySearch = userCityEl.value;
    searchHistory.push(citySearch);
    localStorage.setItem("searchList", JSON.stringify(searchHistory));
    addToSearchList();
  } else {
    alert("Please enter a city name");
  }
};

let addToSearchList = function () {
  let userLastSearch = userCityEl.value;
  let li = document.createElement("li");
  li.textContent = userLastSearch;
  searchListEL.appendChild(li);
};

let renderSearchList = searchHistory.forEach((city) => {
  let li = document.createElement("li");
  li.textContent = city;
  searchListEL.appendChild(li);
});

$("#searchBtn").on("click", searchHandler);
