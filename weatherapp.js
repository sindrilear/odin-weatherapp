async function fetchWeather(url) {
    try {
        const response = await fetch (url, { mode: "cors"});

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

        const data = await response.json();

        console.log(data)
        console.log(data.resolvedAddress);
        console.log(data.currentConditions.conditions);
        console.log(data.currentConditions.temp);
        console.log(data.description);
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
 }

 function searchWeather() {
    userSearch = document.getElementById("weather-search").value;
    url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${userSearch}?unitGroup=metric&key=PF699LCX9VT25TWP45T7P2JH7&`
    console.log(url);
    fetchWeather(url);
 }

 fetchWeather("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/reykjavik?unitGroup=metric&key=PF699LCX9VT25TWP45T7P2JH7&");