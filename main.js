const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const cityHide = document.querySelector(".city-hide");
const inputField = document.querySelector(".search-box input");

document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", function (event) {
    createBubble(event.clientX, event.clientY);
  });

  function createBubble(x, y) {
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.style.left = x + "px";
    bubble.style.top = y + "px";

    document.body.appendChild(bubble);

    // Trigger reflow to apply styles before adding the 'active' class
    bubble.offsetWidth;

    bubble.classList.add("active");

    // Remove the bubble after the transition ends
    bubble.addEventListener("transitionend", function () {
      document.body.removeChild(bubble);
    });
  }
});

function performSearch() {
  const APIKey = "667f2ebaeaa6d6dc5935ceb0453cc147";
  const city = inputField.value;

  if (city == "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod == "404") {
        cityHide.textContent = city;
        container.style.height = "400px";
        weatherBox.classList.remove("active");
        weatherDetails.classList.remove("active");
        error404.classList.add("active");
        return;
      }

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      if (cityHide.textContent == city) {
        return;
      } else {
        cityHide.textContent = city;

        container.style.height = "555px";
        container.classList.add("active");
        weatherBox.classList.add("active");
        weatherDetails.classList.add("active");
        error404.classList.remove("active");
        setTimeout(() => {
          container.classList.remove("active");
        }, 2500);

        switch (json.weather[0].main) {
          case "Clear":
            image.src = "images/clear.png";
            break;

          case "Rain":
            image.src = "images/rain.png";
            break;
          case "Snow":
            image.src = "images/snow.png";
            break;
          case "Cloud":
            image.src = "images/cloud.png";
            break;
          case "Mist":
            image.src = "images/mist.png";
            break;
          case "Haze":
            image.src = "images/mist.png";
            break;

          default:
            image.src = "images/cloud.png";
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;
      }
    });
}

search.addEventListener("click", performSearch);

// Add event listener for 'Enter' key press
inputField.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    performSearch();
  }
});
