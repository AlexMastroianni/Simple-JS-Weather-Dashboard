let city = "";
let citySearch = [];
const searchListEL = document.querySelector("#searchList");
const userCityEl = document.querySelector("#cityName");
const searchForm = document.querySelector("#searchForm");
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
  $("#cityCurrentName").text("Current Forcast: " + weatherData.name);
  $("#cityTemp").text("Temperature: " + weatherData.main.temp + "°C");
  $("#cityHum").text("Humidity: " + weatherData.main.humidity + "%");
  $("#cityWind").text("WindSpeed: " + weatherData.wind.speed + "ms");
  $("#cityImg").html(
    "<img src='https://openweathermap.org/img/w/" +
      weatherData.weather[0].icon +
      ".png' >"
  );
};
let showForcast = function (forcastData) {
  $("#day1Temp").text("Temperature: " + forcastData.list[0].main.temp + "°C");
  $("#day1Hum").text("Humidity: " + forcastData.list[0].main.humidity + "%");
  $("#day1Wind").text("WindSpeed: " + forcastData.list[0].wind.speed + "ms");
  $("#day1Img").html(
    "<img src='https://openweathermap.org/img/w/" +
      forcastData.list[0].weather[0].icon +
      ".png' >"
  );

  $("#day2Temp").text("Temperature: " + forcastData.list[1].main.temp + "°C");
  $("#day2Hum").text("Humidity: " + forcastData.list[1].main.humidity + "%");
  $("#day2Wind").text("WindSpeed: " + forcastData.list[1].wind.speed + "ms");
  $("#day2Img").html(
    "<img src='https://openweathermap.org/img/w/" +
      forcastData.list[1].weather[0].icon +
      ".png' >"
  );

  $("#day3Temp").text("Temperature: " + forcastData.list[2].main.temp + "°C");
  $("#day3Hum").text("Humidity: " + forcastData.list[2].main.humidity + "%");
  $("#day3Wind").text("WindSpeed: " + forcastData.list[2].wind.speed + "ms");
  $("#day3Img").html(
    "<img src='https://openweathermap.org/img/w/" +
      forcastData.list[2].weather[0].icon +
      ".png' >"
  );
  $("#day4Temp").text("Temperature: " + forcastData.list[3].main.temp + "°C");
  $("#day4Hum").text("Humidity: " + forcastData.list[3].main.humidity + "%");
  $("#day4Wind").text("WindSpeed: " + forcastData.list[3].wind.speed + "ms");
  $("#day4Img").html(
    "<img src='https://openweathermap.org/img/w/" +
      forcastData.list[2].weather[0].icon +
      ".png' >"
  );

  $("#day5Temp").text("Temperature: " + forcastData.list[4].main.temp + "°C");
  $("#day5Hum").text("Humidity: " + forcastData.list[4].main.humidity + "%");
  $("#day5Wind").text("WindSpeed: " + forcastData.list[4].wind.speed + "ms");
  $("#day5Img").html(
    "<img src='https://openweathermap.org/img/w/" +
      forcastData.list[2].weather[0].icon +
      ".png' >"
  );
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
          showUV(data);
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
let showUV = function (UVData) {
  $("#cityUV").text("UV Index: " + UVData.value);
  if (UVData.value >= 0 && UVData.value <= 4) {
    $("#cityUV").css("background-color", "green");
  } else if (UVData.value >= 4 && UVData.value <= 6) {
    $("#cityUV").css("background-color", "yellow");
  } else if (UVData.value >= 6 && UVData.value <= 10) {
    $("#cityUV").css("background-color", "red");
  }
};
searchListEL.addEventListener("click", function (e) {
  e.preventDefault();
  const target = e.target;
  if (target.matches("li")) {
    city = target.textContent;
    getWeather(city);
    console.log(city);
  }
});

let searchHandler = function (event) {
  event.preventDefault();
  let userInput = userCityEl.value;
  if (userInput) {
    getWeather(userInput);
    let citySearch = userCityEl.value;
    searchHistory.push(citySearch);
    localStorage.setItem("searchList", JSON.stringify(searchHistory));
    addToSearchList(userInput);
  } else {
    alert("Please enter a city name");
  }
  searchForm.reset();
  return false;
};

let resetSearch = function (event) {
  event.preventDefault();
  form.reset;
};

let addToSearchList = function (userInput) {
  let userLastSearch = userInput;
  let li = document.createElement("li");
  li.textContent = userLastSearch;
  searchListEL.appendChild(li);
  removeDouble();
};
searchHistory.forEach((city) => {
  let li = document.createElement("li");
  li.textContent = city;
  searchListEL.appendChild(li);
  $("#clearBtn").on("click", clearHistory);
});

let removeDouble = function () {
  if (searchHistory.includes(searchListEL)) {
    localStorage.removeItem(userInput);
  } else {
    return;
  }
};

function clearHistory() {
  localStorage.clear();
  location.reload();
}

$("#clearBtn").on("click", clearHistory);

$("#searchBtn").on("click", searchHandler);
