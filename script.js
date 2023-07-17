var rest = document.getElementById("rest");
var apiKey = "0d4b89acb92633b90ee6801c6ab269ab";


async function getdatafromApi() {
  try {
    let data = await fetch("https://restcountries.com/v2/all");
    let get = await data.json();
    return get;
  } catch (err) {
    alert("error occured while fetching");
  }
}


async function render() {
    try {
      const data = await getdatafromApi();
  
      data.slice(0, 3).forEach((item) => {
        const weatherDataId = `weatherData-${item.name}`;
  
        rest.innerHTML += `
         <div class="card item mt-3 mb-3">
            <div class="card-header bg-dark text-light">${item.name}</div>
            <img src=${item.flags.png} class="image-fluid w-100 h-75" alt="...">
            <div class="card-body" id="grad">
              <h5 class="card-title">${item.capital}</h5>
              <h5>${item.region}</h5>
              <h5>${item.alpha3Code}</h5>
              <button onclick="getWeatherData('${item.name}', '${weatherDataId}')">Show Weather</button>
              <div id="${weatherDataId}" style="display: none;">
                <h2>Weather Data</h2>
                <p>City: <span id="city"></span></p>
                <p>Temperature: <span id="temperature"></span> °C</p>
                <p>Weather: <span id="weather"></span></p>
              </div>
            </div>
         </div>
        `;
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  
render()

function getWeatherData(name, weatherDataId) {
    const apiKey = "0d4b89acb92633b90ee6801c6ab269ab";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}`;
  
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const weatherData = document.getElementById(weatherDataId);
        const cityElement = weatherData.querySelector("#city");
        const temperatureElement = weatherData.querySelector("#temperature");
        const weatherElement = weatherData.querySelector("#weather");
  
        cityElement.textContent = data.name;
        temperatureElement.textContent = data.main.temp;
        weatherElement.textContent = data.weather[0].description;
  
        weatherData.style.display = "block";
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }
  