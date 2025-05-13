async function fetchWeather(url, unit) {
    try {
        const response = await fetch (url, { mode: "cors"});

        if (!response.ok) {
            alert("Error! Invalid input");
            throw new Error(`HTTP error! status: ${response.status}`);
          }

        const data = await response.json();

        console.log(data);

        displayWeather(data, unit);
        displayFutureWeather(data, unit);

    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
 }

 function searchWeather() {
    userSearch = document.getElementById("weather-search").value.trim();
    userUnits = document.getElementById("units").value;
    
    if (!userSearch) {
        alert("Please enter a city name.");
        return;
    }

    url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${userSearch}?unitGroup=${userUnits}&key=PF699LCX9VT25TWP45T7P2JH7&`
    console.log(url);
    fetchWeather(url, userUnits);
 }

 function displayWeather(data, unit) {
    weatherheader = document.getElementById("weatherheader");
    weatherdesc = document.getElementById("descheader");
    weathercond = document.getElementById("condition");
    temperature = document.getElementById("temperature");
    feels = document.getElementById("feels");
    humidity = document.getElementById("humidity");
    wind = document.getElementById("wind");
    gust = document.getElementById("gust");

    weatherheader.innerText = data.resolvedAddress;
    weatherdesc.innerHTML = `${data.currentConditions.conditions} <img src=https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/2nd%20Set%20-%20Color/${data.currentConditions.icon}.png />`
    weathercond.innerHTML = `${data.description} <br><br> ${dateToString(data.days[0].datetime)}`;
    if (unit === "metric") {
    temperature.innerText = `${data.currentConditions.temp}°C`;
    feels.innerText = `${data.currentConditions.feelslike}˚C`;
    humidity.innerText = `${data.currentConditions.humidity}%`;
    wind.innerText = `${data.currentConditions.windspeed} kmh`;
    gust.innerText = `${data.currentConditions.windgust} kmh`;
    } else {
        temperature.innerText = `${data.currentConditions.temp}F`;
        feels.innerText = `${data.currentConditions.feelslike}F`;
        humidity.innerText = `${data.currentConditions.humidity}%`;
        wind.innerText = `${data.currentConditions.windspeed} mph`;
        gust.innerText = `${data.currentConditions.windgust} mph`;
    }
 }

 function displayFutureWeather (data, unit) {
    for (let i = 1; i <= 4; i++) {
        futuredesc = document.getElementById(`futuredesc${i}`)
        futuretemp = document.getElementById(`futuretemp${i}`)
        futureday = document.getElementById(`futureday${i}`)
        
        futuredesc.innerHTML = `${data.days[i].conditions} <br> <img src=https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/2nd%20Set%20-%20Color/${data.days[i].icon}.png />`;

        if (unit === "metric") {
            futuretemp.innerText = `${data.days[i].temp}°C`
        } else {
            futuretemp.innerText = `${data.days[i].temp}F`
        }

        futureday.innerText = dateToString(data.days[i].datetime);
    }
 }

 function dateToString(date) {
    const day = new Date(date);
    const formatted = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(day);
    return formatted;
 }

 fetchWeather("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/reykjavik?unitGroup=metric&key=PF699LCX9VT25TWP45T7P2JH7&", "metric");