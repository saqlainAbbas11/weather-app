document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "6029975751dc939f36fe700e7b56c5dd";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

    async function checkWeather(city) {
        try {
            const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);
            const result = await response.json();

            if (result.cod === 200) {
                // Update weather information
                document.getElementById("city").innerHTML = result.name;
                document.getElementById("country").innerHTML = result.sys.country;
                document.getElementById("temp").innerHTML = `${result.main.temp}°C`;
                document.getElementById("feels-like").innerHTML = `${result.main.feels_like}°C`;
                document.getElementById("temp-mood").innerHTML = result.weather[0].main;
                document.getElementById("description").innerHTML = result.weather[0].description;
                document.getElementById("humidity").innerHTML = `${result.main.humidity}%`;

                const weatherImage = document.getElementById("weather");
                const weatherCondition = result.weather[0].main;

                switch (weatherCondition) {
                    case "Clouds":
                        weatherImage.src = "./images/clouds.png";
                        break;
                    case "Clear":
                        weatherImage.src = "./images/clearSky.png";
                        break;
                    case "Rain":
                        weatherImage.src = "./images/rain.png";
                        break;
                    case "Snow":
                        weatherImage.src = "./images/snow.png";
                        break;
                    case "Drizzle":
                        weatherImage.src = "./images/drizzle.png";
                        break;
                    case "Mist":
                        weatherImage.src = "./images/mist.png";
                        break;
                    default:
                        weatherImage.src = "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/draw1.webp";
                }
            }
            // } else {
            //     alert("City not found.");
            // }
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

    document.querySelector('input[type="text"]').addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            const city = e.target.value.trim();
            if (city) {
                checkWeather(city);
            }
        }
    });

    // Default weather check for Karachi
    checkWeather();
});
