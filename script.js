document.getElementById('search-btn').addEventListener('click', function() {
    let city = document.getElementById('city-input').value;
    // Here we are checking if the input is empty or not
    if (city) {
        getWeatherData(city);
    } else {
        alert("Please enter a city name");
    }
});

async function getWeatherData(city) {
    try {
        let apiKey = 'a89fee4e8304fdb8230088bc61b6fe4b';
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        
        let response = await fetch(url);
        
        if (response.ok) {
            let data = await response.json();
            updateWeatherInfo(data);
        } else {
            alert("Could not retrieve weather data. Please try again.");
        }
    } catch (error) {
        alert("An error occurred while fetching the weather data. Please try again.");
    }
}

function updateWeatherInfo(data) {
    let cityName = data.name;
    let temperature = data.main.temp;
    let weatherDescription = data.weather[0].description;
    let weatherMain = data.weather[0].main;

    document.getElementById('city-name').innerText = cityName;
    document.getElementById('temperature').innerText = `Temperature: ${temperature}°C`;
    document.getElementById('weather-description').innerText = `Weather: ${weatherDescription}`;
    document.getElementById('weather-main').innerText = `Condition: ${getWeatherConditionLabel(weatherMain)}`;
}

function getWeatherConditionLabel(condition) {
    if (condition.includes('clear')) {
        return 'Clear';
    } else if (condition.includes('rain')) {
        return 'Rainy';
    } else if (condition.includes('cloud') && !condition.includes('clear')) {
        return 'Cloudy';
    } else if (condition.includes('snow')) {
        return 'Snowy';
    } else {
        return 'Normal';
    }
}
