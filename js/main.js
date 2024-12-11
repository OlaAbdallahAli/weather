// #######  Global Variables =================>
const inputSearch = document.getElementById("search");
const btnSearch = document.getElementById("submit");
let forecastContainer = document.getElementById("forecast");
let data;
let city;
let searchData;
const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
// ####### Events =================>
inputSearch.addEventListener("input", function () {
  searchData = inputSearch.value;
  getWeather(searchData);
});

btnSearch.addEventListener("click", function () {
  searchData = inputSearch.value;
  getWeather(searchData);
});
// ####### Functions =================>
getWeather("cairo");
async function getWeather(city) {
  let response = await fetch(
   `https://api.weatherapi.com/v1/forecast.json?key=beaa6830775a4e99910131438220406&q=${city}07112&days=3`
  );
  if (response.ok) {
    data = await response.json();
    console.log(data);
    displayData();
  }
}

//*******************************/
console.log(Date);
let getWeekDay = (date) => new Date(date);

// display data
function displayData() {
  let forecastDay = data.forecast.forecastday;
  let curentNameDay = weekDays[getWeekDay(forecastDay[0].date).getDay()];
  let nextNameDay = weekDays[getWeekDay(forecastDay[1].date).getDay()];
  let latestNameDay = weekDays[getWeekDay(forecastDay[2].date).getDay()];
  let curentDayMonth = months[getWeekDay(forecastDay[0].date).getMonth()];
  let curentMonthNum = new Date().getDate();
  forecastContainer.innerHTML = ` <div class="today forecast">
            <div
              class="forecast-header d-flex justify-content-between"
              id="today"
            >
              <div class="day">${curentNameDay}</div>
              <div class="date">${curentMonthNum} ${curentDayMonth}</div>
            </div>
            <div class="forecast-content" id="current">
              <div class="location">${data.location.name}</div>
              <div class="degree">
                <div class="num">${data.current.temp_c}<sup>o</sup>C</div>

                <div class="forecast-icon">
                  <img
                    src="https:${data.current.condition.icon}"
                    alt=""
                    width="90"
                  />
                </div>
              </div>
              <div class="custom">${data.current.condition.text}</div>
              <span>
                <img src="./css/images/icon-umberella.png" alt="" />${data.current.cloud}%</span
              >
              <span><img src="./css/images/icon-wind.png" alt="" />${data.current.wind_kph}km/h</span>
              <span
                ><img src="./css/images/icon-compass.png" alt="" />${data.current.wind_dir}</span
              >
            </div>
          </div>
          <div class="next-days forecast">
            <div class="forecast-header">
              <div class="day">${nextNameDay}</div>
            </div>
            <div class="forecast-content">
              <div class="forecast-icon">
                <img
                  src="https:${data.forecast.forecastday[1].day.condition.icon}"
                  alt=""
                  width="48"
                />
              </div>
              <div class="degree">${data.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</div>
              <small>${data.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></small>
              <div class="custom">${data.forecast.forecastday[1].day.condition.text}</div>
            </div>
          </div>
          <div class="next-days forecast">
            <div class="forecast-header">
              <div class="day">${latestNameDay}</div>
            </div>
            <div class="forecast-content">
              <div class="forecast-icon">
                <img
                  src="https:${data.forecast.forecastday[2].day.condition.icon}"
                  alt=""
                  width="48"
                />
              </div>
              <div class="degree">${data.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</div>
              <small>${data.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></small>
              <div class="custom">${data.forecast.forecastday[2].day.condition.text}</div>
            </div>
          </div>`;
}
