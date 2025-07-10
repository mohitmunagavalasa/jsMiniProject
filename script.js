    document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('cityInput');
    const fetchWeatherBtn = document.getElementById('fetchWeatherBtn');
    const weatherDisplay = document.getElementById('weatherDisplay');
    const message = document.getElementById('message');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const weatherInfo = document.getElementById('weatherInfo');
    const cityNameElement = document.getElementById('cityName');
    const temperatureElement = document.getElementById('temperature');
    const humidityElement = document.getElementById('humidity');
    const descriptionElement = document.getElementById('description');

    const API_KEY = 'b0f65f58222d274caee4a29c143d8579';
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

    async function fetchWeatherData(city) {
        message.textContent = '';
        weatherInfo.classList.add('hidden');
        loadingIndicator.classList.remove('hidden');

        if (!city) {
            message.textContent = 'Please enter a city name.';
            loadingIndicator.classList.add('hidden');
            return;
        }

        if (API_KEY === 'YOUR_API_KEY' || !API_KEY) {
            message.textContent = 'Please replace "YOUR_API_KEY" in the JavaScript code with your actual OpenWeatherMap API key.';
            loadingIndicator.classList.add('hidden');
            return;
        }

        const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (response.ok) {
                const name = data.name;
                const main = data.main;
                const weather = data.weather[0];

                cityNameElement.textContent = name;
                temperatureElement.textContent = `${main.temp}°C`;
                humidityElement.textContent = `${main.humidity}%`;
                descriptionElement.textContent = weather.description;

                weatherInfo.classList.remove('hidden');
            } else {
                if (data.message) {
                    message.textContent = `Error: ${data.message}. Please check the city name or your API key.`;
                } else {
                    message.textContent = 'An unknown error occurred while fetching weather data.';
                }
            }
        } catch (error) {
            console.error('Fetch error:', error);
            message.textContent = 'Could not fetch weather data. Please check your internet connection.';
        } finally {
            loadingIndicator.classList.add('hidden');
        }
    }

    fetchWeatherBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        fetchWeatherData(city);
    });

    cityInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const city = cityInput.value.trim();
            fetchWeatherData(city);
        }
    });
});