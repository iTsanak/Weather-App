const form = document.getElementById('search-form');
const cityInput = document.getElementById('search-input');
const weatherInfo = document.getElementById('weather-info');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        try {
            const weatherData = await fetchWeather(city);
            displayWeather(weatherData);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            weatherInfo.textContent = 'An error occurred. Please try again.';
        }
    }
});

async function fetchWeather(city) {
    const apiKey = '????????????????????????????';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Weather data not found');
    }
    const data = await response.json();
    return {
        temperature: data.main.temp,
        description: data.weather[0].description,
        city: data.name,
        humidity: data.main.humidity,
        wind_speed: data.wind.speed,
    };
}

function displayWeather(weatherData) {
    weatherInfo.innerHTML = `Current temperature in ${weatherData.city}: ${weatherData.temperature}°C<br>
    Description: ${weatherData.description}<br>
    Humidity: ${weatherData.humidity}%<br>
    Wind Speed: ${weatherData.wind_speed} m/s<br>
    `;
}





