var cityInputEl = document.querySelector("#city");

var userFormEl = document.querySelector(".user-form");

var dateEl = document.querySelectorAll("h5");

var tempEl = document.querySelectorAll(".temp");

var windEl = document.querySelectorAll(".wind");

var humidityEl = document.querySelectorAll(".humidity");

var imgEl = document.querySelectorAll(".img");

var currentCityEl = document.querySelector(".current-city");

var currentTempEl = document.querySelector(".current-temp");

var currentWindEl = document.querySelector(".current-wind");

var currentHumidityEl = document.querySelector(".current-humidity");

var uvEl = document.querySelector(".uv");



var getCityWeather = function (newLat, newLon) {

    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + newLat + "&lon=" + newLon + "&exclude=hourly,alerts,minutely&appid=fe42c176df9021a92dcfd0baf551be5d&units=imperial";

    var currentWeather = "https://api.openweathermap.org/data/2.5/forecast?lat=" + newLat + "&lon=" + newLon + "&appid=fe42c176df9021a92dcfd0baf551be5d&units=imperial";

    fetch(currentWeather).then(function(response) {


        if (response.ok) {

            response.json().then(function (data) {

                for (var i = 0; i < 5; i++) {

                    currentCityEl.innerText = data.city.name;

                }



            })
        }
    })



    fetch(apiUrl).then(function (response) {

        if (response.ok) {

            response.json().then(function (data) {

                console.log(data);


                for (var i = 0; i < 5; i++) {

                    tempEl[i].innerText = "Temp: " + (data.daily[i].temp.max) + "°F";


                }

                for (var i = 0; i < 5; i++) {

                    windEl[i].innerText = "Wind: " + (data.daily[i].wind_speed) + " MPH";

                }

                for (var i = 0; i < 5; i++) {

                    humidityEl[i].innerText = "Humidity: " + (data.daily[i].humidity) + "%";

                }

                for (var i = 0; i < 5; i++) {

                    imgEl[i].src = " http://openweathermap.org/img/wn/" + (data.daily[i].weather[0].icon) + "@2x.png";

                }

                currentTempEl.innerText = "Temp: " + data.current.temp + "°F";

                currentWindEl.innerText = "Wind: " + data.current.wind_speed + " MPH";

                currentHumidityEl.innerText = "Humidity: " + data.current.humidity + "%"; 

                uvEl.innerText = "UV Index: " + data.current.uvi;

            });

        }

        else {

            alert("Error: data not found")

        }

    });

};

var getCityGeo = function (city) {

    var geoApiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=fe42c176df9021a92dcfd0baf551be5d";

    fetch(geoApiUrl).then(function (response) {


        if (response.ok) {

            response.json().then(function (data) {

                var newLat = data[0].lat;

                var newLon = data[0].lon;

                getCityWeather(newLat, newLon);

            });

        }

    });

};


var cityFormSubmit = function (event) {

    event.preventDefault();

    var cityName = cityInputEl.value.trim();

    if (cityName) {

        getCityGeo(cityName);

        cityInputEl.value = "";

    }

    else {

        alert("Please enter a city name")

    }

    console.log(event);

};


userFormEl.addEventListener("submit", cityFormSubmit);



