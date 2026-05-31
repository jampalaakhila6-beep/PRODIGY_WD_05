const apiKey = "307db8b186c316444b40e7919f5ee6c4";

async function getWeather() {
    const city = document.getElementById("cityInput").value;

    if(city === ""){
        alert("Please enter a city name");
        return;
    }

    const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetchWeather(url);
}

async function fetchWeather(url){
    try{
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod == "404") {
    alert("Location not found. Try a larger city or add ',IN' after the name.");
    return;
}

        document.getElementById("city").innerText =
        data.name + ", " + data.sys.country;

        document.getElementById("temp").innerText =
        data.main.temp + " °C";

        document.getElementById("condition").innerText =
        data.weather[0].description;

        document.getElementById("humidity").innerText =
        data.main.humidity + "%";

        document.getElementById("wind").innerText =
        data.wind.speed + " m/s";

        document.getElementById("icon").src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    }catch(error){
        alert("Error fetching weather data");
    }
}

function getLocationWeather(){

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(async(position)=>{

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const url =
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            fetchWeather(url);

        });

    }else{
        alert("Geolocation not supported");
    }
}