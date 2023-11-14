// Clé D'api
const API_KEY = "b476218e49ef0d0755a713e9ba77f79a";
// Lien vers L'api finissant par une recherche
const API_URL = `https://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}&units=metric&lang=fr&q=`;


const divContain = document.getElementById("container");
divContain.id = "container";


const titleDiv = document.createElement("div");
titleDiv.className = "title";

// Création H1
const heading = document.createElement('h1');

// Set the text content of the h1 element
heading.textContent = 'My Weather App';



// Div input

const inputDiv = document.createElement("div");
inputDiv.className = "input-group";

// Création barre de recherche
const inputSearch = document.createElement("input");
inputSearch.id = "searchBox";
inputSearch.type = "text";
inputSearch.placeholder = "Entrez le nom de la ville"; // Ajout du placeholder

// Création de div
const newDiv = document.createElement("div");
newDiv.id = "allTogether";

// Création de div
const forecastDiv = document.createElement("div");
forecastDiv.id = "prevision";




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




// Function to format the date and time
function formatDateTime() {
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
    return currentDate.toLocaleDateString('fr-FR', options);
}

// Create a div to display the date and time
    const dateTimeDiv = document.createElement("div");
    dateTimeDiv.id = "dateTime";
    infoCityDiv.appendChild(dateTimeDiv);

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
            temperature.innerHTML = ` Température :  ${Math.round(data.list[0].main.temp)}°C `;
            feelsLike.textContent = "Temps Ressenti : " + Math.round(data.list[0].main.feels_like) + "°C";
            humidity.textContent = "humidityIcon : " + data.list[0].main.humidity + "%";
            DataWind.textContent = "Vitesse du vent : " + Math.floor(data.list[0].wind.speed) + " Km/h";
            pressure.textContent = "Pression : " + data.list[0].main.pressure + " hPa";


             // Afficher les prévisions pour les 5 prochains jours
             for (let i = 0; i < data.list.length; i += 8) {
                const dayForecast = document.createElement("div");
                dayForecast.className = "day-forecast";

                const date = new Date(data.list[i].dt * 1000);
                const dayName = new Intl.DateTimeFormat('fr-FR', { weekday: 'long' }).format(date);

                const dayNameElement = document.createElement("p");
                dayNameElement.textContent = dayName;

                const iconElement = document.createElement("img");
                iconElement.src = `http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`;

                const descriptionElement = document.createElement("p");
                descriptionElement.textContent = data.list[i].weather[0].description;

                const temperatureElement = document.createElement("p");
                temperatureElement.textContent = ` ${Math.round(data.list[i].main.temp)}°C`;

                dayForecast.append(dayNameElement, iconElement, descriptionElement, temperatureElement);
                forecastDiv.appendChild(dayForecast);
             }
             
               // Display the date and time
               dateTimeDiv.textContent = "Date du jour : " + formatDateTime();

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
titleDiv.appendChild(heading)
divContain.append(titleDiv, inputSearch, newDiv, forecastDiv); // ajout de tous les éléments à divContain
document.body.appendChild(divContain);



// Mise à jour des informations météorologiques toutes les 5 minutes
setInterval(function () {
    // Ici, mettre à jour les informations de la météo à l'aide de l'API ou d'autres sources
    // Vous pouvez appeler la fonction checkWeather avec la dernière ville recherchée
    checkWeather(inputSearch.value);
}, 5 * 60 * 1000);

