const apiKey = "13d1f4e131604802ba3f81519311e0aa";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

function updateDateTime() {
  const now = new Date();
  const opts = { weekday:'long', month:'short', day:'numeric', hour:'2-digit', minute:'2-digit', second:'2-digit' };
  document.getElementById("dateTimeBox").innerText = now.toLocaleDateString('en-US', opts);
}
setInterval(updateDateTime, 1000);

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const errorEl = document.getElementById("error");
  const infoEl = document.getElementById("weatherInfo");
  const cityEl = document.getElementById("cityName");

  if (!city) return;
  const response = await fetch(apiUrl + encodeURIComponent(city) + `&appid=${apiKey}`);

  if (!response.ok) {
    errorEl.style.display = "block";
    infoEl.style.display = "none";
    cityEl.innerText = "";
    return;
  }

  const data = await response.json();
  errorEl.style.display = "none";
  infoEl.style.display = "block";

  cityEl.innerText = `${data.name}, ${data.sys.country}`;
  document.getElementById("temperature").innerText = Math.round(data.main.temp);
  document.getElementById("humidity").innerText = data.main.humidity;
  document.getElementById("wind").innerText = data.wind.speed;
  document.getElementById("clouds").innerText = data.clouds.all;

  const rainVal = data.rain && data.rain["1h"] ? data.rain["1h"] : 0;
  document.getElementById("rain").innerText = rainVal;

  document.getElementById("weatherIcon").src = getIcon(data.weather[0].main);
}

function getIcon(cond) {
  const icons = {
    Clouds: "https://cdn-icons-png.flaticon.com/512/414/414826.png",
    Clear: "https://cdn-icons-png.flaticon.com/512/869/869869.png",
    Rain: "https://cdn-icons-png.flaticon.com/512/3076/3076129.png",
    Drizzle: "https://cdn-icons-png.flaticon.com/512/414/414974.png",
    Mist: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
    Snow: "https://cdn-icons-png.flaticon.com/512/642/642102.png",
    Thunderstorm: "https://cdn-icons-png.flaticon.com/512/1146/1146869.png"
  };
  return icons[cond] || icons.Clear;
}
