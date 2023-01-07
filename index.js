let authorEl = document.getElementById("author-el");
let cryptoEl = document.getElementById("crypto-top");
let cryptoEl1 = document.getElementById("crypto-el");
let timeEl = document.getElementById("time-el");
let weatherEl = document.getElementById("weather");

fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
)
  .then((response) => response.json())
  .then((data) => {
    document.body.style.backgroundImage = `url(${data.urls.full})`;
    authorEl.innerHTML = `Image-By: ${data.user.name}`;
  });

fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
  .then((response) => response.json())
  .then((data) => {
    cryptoEl.innerHTML = `
        <img src=${data.image.small} />
        <span>${data.name}</span>
    `;
    cryptoEl1.innerHTML += `
    <p>🧿: $${data.market_data.current_price.usd}</p>
    <p>👆: $${data.market_data.high_24h.usd}</p>
    <p>👇: $${data.market_data.low_24h.usd}</p>
    `;
  });

function getCurrentTime() {
  const date = new Date();
  //just search on google and stack overflow about adding the time thorugh js
  timeEl.textContent = date.toLocaleTimeString("en-us", { timeStyle: "short" });
}

setInterval(getCurrentTime, 1000); // It will update the time on the dashboard every 1000 ms

// The next thing is to add weather using open weather api
//So for that we are using api predefined methods

const appId = "4c1ed464b493fbed5601688fad1c8f7f";

navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${appId}&units=metric`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error("Weather data not available");
      }
      return res.json();
    })
    .then(data => {
    //   console.log(data);
      let iconUrl=`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      weatherEl.innerHTML =`
      <img src=${iconUrl} />
      <p class="weather-temp">${Math.round(data.main.temp)}&deg</p>
      <p class="weather-city">${data.name}</p>
      `
    })
    .catch((err) => console.log(err));
});
