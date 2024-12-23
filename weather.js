const apiKey = 'Y2e06ea3ea4dbb2bd06bf0c9784b2f232'; // Replace with your OpenWeatherMap API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/';

document.getElementById('search-city').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    if (city) {
        fetchWeather(city);
    } else {
        alert('Please enter a city name!');
    }
});

async function fetchWeather(city) {
    try {
        const response = await fetch(`${apiUrl}weather?q=${city}&units=metric&appid=${apiKey}`);
        const data = await response.json();
        displayCurrentWeather(data);

        // Fetch 7-day forecast
        const forecastResponse = await fetch(`${apiUrl}forecast/daily?q=${city}&units=metric&cnt=7&appid=${apiKey}`);
        const forecastData = await forecastResponse.json();
        displayForecast(forecastData);
    } catch (error) {
        alert('Failed to fetch weather data. Please check your input and try again.');
    }
}

function displayCurrentWeather(data) {
    document.getElementById('location').textContent = `Weather in ${data.name}`;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp} °C`;
    document.getElementById('description').textContent = `Condition: ${data.weather[0].description}`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind').textContent = `Wind Speed: ${data.wind.speed} m/s`;
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = ''; // Clear previous forecast
    data.list.forEach(day => {
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        forecastItem.innerHTML = `
            <p>${new Date(day.dt * 1000).toLocaleDateString()}</p>
            <p>${day.weather[0].description}</p>
            <p>${day.temp.day} °C</p>
        `;
        forecastContainer.appendChild(forecastItem);
    });
}
