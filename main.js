document.getElementById("saveBtn").addEventListener("click", () => {
  const selectedColor = document.getElementById("colorPic").value;
  localStorage.setItem("color", selectedColor);

  const storedColor = localStorage.getItem("color");
  document.querySelector("header").style.backgroundColor = storedColor;
  document.querySelectorAll("button").forEach((button) => {
    button.style.backgroundColor = storedColor;
  });
  document.querySelector(".container").style.backgroundColor = storedColor;
});

document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "53f3ae97114aefd746332647ac42b50d";
  const searchButton = document.querySelector("button");
  const searchInput = document.getElementById("searchInput");

  searchButton.addEventListener("click", () => {
    const cityName = searchInput.value.trim();
    if (cityName) {
      fetchWeatherData(cityName);
      fetchForecastData(cityName);
    }
  });

  async function fetchWeatherData(cityName) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      updateWeatherInfo(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert(error.message);
    }
  }

  async function fetchForecastData(cityName) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      updateForecastInfo(data);
    } catch (error) {
      console.error("Error fetching forecast data:", error);
      alert(error.message);
    }
  }

  function updateWeatherInfo(data) {
    const container = document.querySelector(".container");
    const city = data.name;
    const country = data.sys.country;
    const temperature = data.main.temp;
    const wind = data.wind.speed;
    const humidity = data.main.humidity;
    const weatherIcon = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

    container.querySelector("h3").textContent = `${city} (${country})`;
    container.querySelector(
      "h6:nth-of-type(1)"
    ).textContent = `Temperature: ${temperature}°C`;
    container.querySelector(
      "h6:nth-of-type(2)"
    ).textContent = `Wind: ${wind} M/S`;
    container.querySelector(
      "h6:nth-of-type(3)"
    ).textContent = `Humidity: ${humidity}%`;

    const iconImg = document.createElement("img");
    iconImg.src = iconUrl;
    iconImg.alt = data.weather[0].description;
    container.querySelector("h3").appendChild(iconImg);
  }

  function updateForecastInfo(data) {
    const cards = document.querySelectorAll(".crd");
    const forecast = data.list.filter((item) =>
      item.dt_txt.includes("12:00:00")
    );

    forecast.forEach((item, index) => {
      if (index < 5) {
        const date = new Date(item.dt_txt).toLocaleDateString();
        const temperature = item.main.temp;
        const wind = item.wind.speed;
        const humidity = item.main.humidity;
        const weatherIcon = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

        const card = cards[index];
        card.querySelector("h5").textContent = date;
        card.querySelector(
          "h6:nth-of-type(1)"
        ).textContent = `Temperature: ${temperature}°C`;
        card.querySelector(
          "h6:nth-of-type(2)"
        ).textContent = `Wind: ${wind} M/S`;
        card.querySelector(
          "h6:nth-of-type(3)"
        ).textContent = `Humidity: ${humidity}%`;

        const iconImg = document.createElement("img");
        iconImg.src = iconUrl;
        iconImg.alt = item.weather[0].description;
        card.querySelector("h5").appendChild(iconImg);
      }
    });
  }
});
