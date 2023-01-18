// Formulaire
const cityForm = document.getElementById("cityForm");

//input de la ville
const cityInput = document.querySelector("#city");

//btn de validation
const btnGet = document.querySelector(".select-city");

//menu déroulant pour doublons
const citySelect = document.querySelector("#select-the-good-city");

const values = document.querySelectorAll(".value");

//div.city pour afficher le nom de la ville séléctionné
const cityShow = document.querySelector(".city");

//div#imgWeather pour afficher l'icone de la météo dynamiquement
const weatherImg = document.querySelector("#imgWeather");

//div.temp-value pour afficher la temperature
const tempShow = document.querySelector(".temp-value");

//div.wet-value pour afficher l'humidité
const wetShow = document.querySelector(".wet-value");

//div.wind-value pour afficher la vitesse du vent
const windShow = document.querySelector(".wind-value");

const apiKey = "9843a344764c7816f2325b732271f5e4";

async function getGps(city) {
  // console.log("Demande de coordonées GPS");
  let url = `https://api.openweathermap.org/geo/1.0/direct?q=${city},fr&limit=2&appid=${apiKey}`;

  await fetch(url)
    .then((response) => {
      let responseGps = response.json();
      return responseGps;
    })
    .then((data) => {
      let myData = data;
      let nbData = Object.keys(myData).length;
      // console.log("Informations réceptionnées :");
      // console.log(`${nbData} villes trouvées la première est séléctionnée.`);

      if (nbData > 0) {
        let name = myData[0].name;
        let departement = myData[0].state;
        let country = myData[0].country;
        let lat = myData[0].lat;
        let lon = myData[0].lon;
        // console.log(
        //   `Demande de météo pour la ville : ${name}, département : ${departement}, pays : ${country}, latitude: ${lat}, longitude: ${lon}.`
        // );
        getWeather(lat, lon);

        //une fois les valeurs chargées par getWeather on confirme le nom de la ville
        cityShow.textContent = name;
      } else {
        alert("Aucune ville trouvée à ce nom, essayer une autre écriture");
      }
    });
}

async function getWeather(lat, lon) {
  // console.log("Demande de météo en cours...");

  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  await fetch(url)
    .then((response) => {
      let responseWeather = response.json();
      return responseWeather;
    })
    .then((data) => {
      let myWeather = data;
      let myWeatherStatus = myWeather.weather[0].main;
      // console.log(myWeatherStatus);
      if (myWeatherStatus === "Clear sky" || myWeatherStatus === "Clear") {
        document.body.style.background =
          "url(../public/img/bg-sun.jpg) no-repeat center/cover fixed";
        for (const value of values) {
          value.style.color = "black";
        }
      } else if (myWeatherStatus === "Snow") {
        document.body.style.background =
          "url(../public/img/bg-snow.jpg) no-repeat center/cover fixed";
        for (const value of values) {
          value.style.color = "black";
        }
      } else if (
        myWeatherStatus === "Shower rain" ||
        myWeatherStatus === "Rain" ||
        myWeatherStatus === "Thunderstorm"
      ) {
        document.body.style.background =
          "url(../public/img/bg-rain.jpg) no-repeat center/cover fixed";
        for (const value of values) {
          value.style.color = "lightcyan";
        }
      } else {
        document.body.style.background =
          "url(../public/img/bg-cloud.jpg) no-repeat center/cover fixed";
        for (const value of values) {
          value.style.color = "lightcyan";
        }
      }
      let weatherIconId = myWeather.weather[0].icon;
      let myWeatherIcon = `http://openweathermap.org/img/wn/${weatherIconId}@2x.png`;
      let myTemp = Math.round(myWeather.main.temp - 273.15); //passage du Kelvin en Celcius +  arrondit
      let myWet = Math.round(myWeather.main.humidity);
      let myWind = Math.round(myWeather.wind.speed * 3.6); //passage du m/s en km/h
      // console.log(
      //   `Température : ${myTemp}°C. Humidité = ${myWet}%. Vent = ${myWind}km/h`
      // );

      // Affichage des infos en front
      weatherImg.src = myWeatherIcon;
      tempShow.textContent = `${myTemp}°C`;
      wetShow.textContent = `${myWet} %`;
      windShow.textContent = `${myWind} km/h`;
    });
}

document.addEventListener("DOMContentLoaded", (e) => {
  getGps("Paris");
});

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let cityAsk = cityInput.value;
  // console.log("Ville demandé : " + cityAsk);

  if (isNaN(cityAsk)) {
    getGps(cityAsk);
  } else {
    alert("Erreur il faut saisir une ville");
  }
});
