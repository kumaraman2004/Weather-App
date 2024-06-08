const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

search.addEventListener('click', () => {
    const apikey = '3c5bc75069037693a3bc21e2625b95da';
    const city = document.querySelector('.search-box input').value;

    if (city === '') {
        return;
    }
    
        fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apikey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod == '404') {
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }
            container.style.height = '555px';
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');

            const weatherIcon = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case "Clouds":
                    weatherIcon.src = "cloud.png";
                    break;
                case "Clear":
                    weatherIcon.src = "clear.png";
                    break;
                case "Rain":
                    weatherIcon.src = "rain.png";
                    break;
                case "Snow":
                    weatherIcon.src = "snow.png";
                    break;
                case "Mist":
                    weatherIcon.src = "mist.png";
                    break;
                case "Haze":
                    weatherIcon.src = "mist.png";
                    break;
                case "Overcast":
                    weatherIcon.src = "overcast.png";
                    break;
                default:
                    weatherIcon.src = "cloud.png"; // Default image for unmatched conditions
                
            }

            const dateTime = new Date(json.dt * 1000);
            document.querySelector(".date-time").innerHTML = dateTime.toLocaleString();

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°c</span>`;
            description.innerHTML = json.weather[0].description;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${json.wind.speed}Km/h`;
        })
});