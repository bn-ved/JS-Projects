const API_KEY = "82fa10d1d6ef341083891f664b922f61";
const API_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");

async function fetchWeatherData(city) {
    const response = await fetch(`${API_URL}${city}&appid=${API_KEY}`);

    if(response.status === 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return;
    }
    const data = await response.json();

    // Update the data in the HTML
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}°C`;
    document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
    document.querySelector(".wind").innerHTML = `${data.wind.speed} km/h`;

    // change the weather icon based on the weather condition
    const weatherIcon = document.querySelector(".weather-icon");
    switch (data.weather[0].main) {
        case "Clouds":
            weatherIcon.src = "assets/images/clouds.png";
            break;
        case "Clear":
            weatherIcon.src = "assets/images/clear.png";
            break;
        case "Rain":
            weatherIcon.src = "assets/images/rain.png";
            break;
        case "Drizzle":
            weatherIcon.src = "assets/images/drizzle.png";
            break;
        case "Mist":
            weatherIcon.src = "assets/images/mist.png";
            break;
        case "Snow":
            weatherIcon.src = "assets/images/snow.png";
            break;
        default:
            weatherIcon.src = "assets/images/clear.png";
    }
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
}

searchButton.addEventListener("click", () => {
    fetchWeatherData(searchBox.value);
});