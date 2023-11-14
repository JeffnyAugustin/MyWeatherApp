// Clé D'api
const API_KEY = "b476218e49ef0d0755a713e9ba77f79a";
// Lien vers L'api finissant par une recherche
const API_URL = `https://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}&units=metric&lang=fr&q=`;


const divContain = document.getElementById("container");
divContain.id = "container";

// Création barre de recherche
const inputSearch = document.createElement("input");
inputSearch.id = "searchBox";
inputSearch.type = "text";
inputSearch.placeholder = "Entrez le nom de la ville"; // Ajout du placeholder

// Création de div
const newDiv = document.createElement("div");
newDiv.id = "allTogether";

const infoCityDiv = document.createElement("div");
infoCityDiv.id = "cityDescription";


// Création de div oiuyr stocker img + description
const cityImgDiv = document.createElement("div");
cityImgDiv.id = "cityElement";

// Création de div pour afficher les informations météorologiques
const weather = document.createElement("div");
weather.id = "meteoElement";

// Création balise paragraphe pour collecter le nom de la ville
const cityName = document.createElement("p");
cityName.className = "cityName";

// Création de div pour afficher la température
const temperatureDiv = document.createElement("div");
temperatureDiv.className = "temperature-container";

// Création balise paragraphe
const temperature = document.createElement("p");
temperature.className = "temps";

// Création de div pour afficher le temps ressenti
const feelsLikeDiv = document.createElement("div");
feelsLikeDiv.className = "feels-like-container";

// Création balise paragraphe pour la sensation thermique
const feelsLike = document.createElement("p");
feelsLike.className = "feels-like";

// Création de div pour afficher l'humidité
const humidityDiv = document.createElement("div");
humidityDiv.className = "humidity-container";

// Création de balise paragraphe pour l'humidité
const humidity = document.createElement("p");
humidity.className = "humidity";

// Création de div pour afficher le vent
const windDiv = document.createElement("div");
windDiv.className = "wind-container";

// Création de balise wind
const DataWind = document.createElement("p");
DataWind.className = "wind";



// Création de div pour l'humidité 
const pressureDiv = document.createElement("div");
pressureDiv.className = "pressure-container";

// Création de balise paragraphe pour la pression atmosphérique
const pressure = document.createElement("p");
pressure.className = "pressure";

// Création de div pour afficher la description
const descriptionDiv = document.createElement("div");
descriptionDiv.className = "description-container";

// Création de balise paragraphe pour la description
const description = document.createElement("p");
description.className = "description";



// Création balise image
const image = document.createElement("img");

// Création balise icône pour la température
const temperatureIcon = document.createElement("i");
temperatureIcon.className = "fas fa-thermometer-half";

// Création balise icône pour la sensation thermique
const feelsLikeIcon = document.createElement("i");
feelsLikeIcon.className = "fas fa-temperature-high";

// Création balise icône pour l'humidité
const humidityIcon = document.createElement("i");
humidityIcon.className = "fas fa-tint";

// Création balise icône pour le vent
const windIcon = document.createElement("i");
windIcon.className = "fas fa-wind";

// Création balise icône pour la pression
const pressureIcon = document.createElement("i");
pressureIcon.className = "fas fa-tachometer-alt";



temperatureDiv.append(temperatureIcon, temperature); // ajout de l'icône

feelsLikeDiv.append(feelsLikeIcon, feelsLike); // ajout de l'icône

humidityDiv.append(humidityIcon, humidity); // ajout de l'icône

windDiv.append(windIcon, DataWind); // ajout de l'icône

pressureDiv.append(pressureIcon, pressure)

descriptionDiv.appendChild( description); // ajout de l'icône

function checkWeather(city) {
    fetch(API_URL + city)
        .then(res => {
            if (!res.ok) {
                throw new Error("La ville n'a pas été trouvée");
            }
            return res.json();
        })
        .then(data => {
            cityName.textContent = data.city.name;
            image.src = `http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`;

            description.textContent = data.list[0].weather[0].description;
            temperature.textContent = "temperatureIcon: " + Math.round(data.list[0].main.temp) + "°C";
            feelsLike.textContent = "Temps Ressenti : " + Math.round(data.list[0].main.feels_like) + "°C";
            humidity.textContent = "humidityIcon : " + data.list[0].main.humidity + "%";
            DataWind.textContent = "Vitesse du vent : " + Math.floor(data.list[0].wind.speed) + " Km/h";
            pressure.textContent = "Pression : " + data.list[0].main.pressure + " hPa";

        })
        .catch(error => {
            console.error("Erreur de requête :", error.message);
            // Ajoutez ici un traitement pour informer l'utilisateur de l'erreur
        });
}

inputSearch.addEventListener("change", () => {
    checkWeather(inputSearch.value);
});

weather.append(temperatureDiv, feelsLikeDiv, humidityDiv, windDiv, pressureDiv); // ajout des éléments Weather
newDiv.append(infoCityDiv, weather); // ajout du conteneur Weather à newDiv
infoCityDiv.append(cityName, cityImgDiv)
cityImgDiv.append(image, descriptionDiv)
divContain.append(inputSearch, newDiv); // ajout de tous les éléments à divContain
document.body.appendChild(divContain);



// Mise à jour des informations météorologiques toutes les 5 minutes
setInterval(function() {
    // Ici, mettre à jour les informations de la météo à l'aide de l'API ou d'autres sources
   }, 5 * 60 * 1000);
