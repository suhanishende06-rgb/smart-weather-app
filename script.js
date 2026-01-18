const apiKey = "YOUR_API_KEY_HERE";

function showWeather(data) {
  document.getElementById("city").innerText = data.name;
  document.getElementById("temp").innerText =
    "Temperature: " + data.main.temp + " °C";
  document.getElementById("condition").innerText =
    "Condition: " + data.weather[0].main;
  document.getElementById("humidity").innerText =
    "Humidity: " + data.main.humidity + "%";
  document.getElementById("wind").innerText =
    "Wind Speed: " + data.wind.speed + " m/s";

  const iconCode = data.weather[0].icon;
  document.getElementById("icon").src =
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

function getWeatherByCity() {
  const city = document.getElementById("cityInput").value;
  if (city === "") {
    alert("Enter city name");
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => showWeather(data))
    .catch(() => alert("City not found"));
}

function getWeatherByLocation() {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
      .then(res => res.json())
      .then(data => showWeather(data));
  });
}
