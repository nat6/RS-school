const weatherIconBox = document.querySelector('.weather-icon');
const temperatureBox = document.querySelector('.temperature');
const weatherDescriptionBox = document.querySelector('.weather-description');
const feelsBox = document.querySelector('.feels');
const windBox = document.querySelector('.wind');
const humidityBox = document.querySelector('.humidity');

const cityBox = (<HTMLInputElement> document.querySelector('.city'));

const weatherError = document.querySelector('.weather-error');
const weatherClean = document.querySelectorAll('.weather_clean');


function setLocalStorageWeather() {
  localStorage.setItem('city', cityBox.value);
}
window.addEventListener('beforeunload', setLocalStorageWeather);


function getLocalStorageWeather() {
  const currentCity:any = localStorage.getItem('city');

  if (localStorage.getItem('city')) {
    cityBox.value = currentCity;
    getWeather();
  } else {
    cityBox.value = 'Minsk';
    getWeather();
  }
}
window.addEventListener('load', getLocalStorageWeather);


async function getWeather() {
  const currentCity = (cityBox.value);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&lang=en&appid=7a00c7fc97cb4345fae62739e75e89e1&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.cod == 404) getErrorWeather();

  const icon = data.weather[0].id;
  const temperature = Math.floor(data.main.temp);
  const description = data.weather[0].description;
  const feels = Math.floor(data.main.feels_like);
  const wind = Math.floor(data.wind.speed);
  const humidity = data.main.humidity;

  if (weatherError) weatherError.textContent = '';

  if (weatherIconBox) {
    weatherIconBox.className = 'weather-icon owf';
    weatherIconBox.classList.add(`owf-${icon}`);
  }
  if (temperatureBox) temperatureBox.textContent = `${temperature}°C`;
  if (weatherDescriptionBox) weatherDescriptionBox.textContent = description;
  if (feelsBox) feelsBox.textContent = `Feels like: ${feels}°C`;
  if (windBox) windBox.textContent = `Wind speed: ${wind} m/s`;
  if (humidityBox) humidityBox.textContent = `Humidity: ${humidity}%`;
}
getWeather();
cityBox.addEventListener('change', getWeather);


function getErrorWeather() {
  const error = `Error! city not found for '${cityBox.value}'!`;
  if (weatherError) weatherError.textContent = error;

  if (weatherIconBox) weatherIconBox.className = 'weather-icon owf';
  weatherClean.forEach(item => item.textContent = '');
}