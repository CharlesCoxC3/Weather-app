var searchInput = document.querySelector("#search-input")
var searchButton = document.querySelector("#button-addon2")
var searchResults = document.querySelector("#search-results")
var latNum
var lonNum

var forecastDayOneTitle = document.querySelector("#forecastDay1")
var weatherDayOne = document.querySelector("#weatherText1")
var weatherTempOne = document.querySelector("#weatherTemp1")
var windOne = document.querySelector("#wind1")
var imageOne = document.querySelector("#img1")

var forecastDayTwoTitle = document.querySelector("#forecastDay2")
var weatherDayTwo = document.querySelector("#weatherText2")
var weatherTempTwo = document.querySelector("#weatherTemp2")
var windTwo = document.querySelector("#wind2")
var imageTwo = document.querySelector("#img2")

searchButton.addEventListener("click", function(){
    var searchQuery = searchInput.value
    console.log(searchQuery)
    citySearch(searchQuery)
});

function citySearch(search){
    var cityUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + encodeURIComponent(search) 
                + "&limit=1&appid=5a69d7be0eb17b91b671817abaaadbbb";
                console.log(cityUrl)

    fetch(cityUrl).then(function(response){
        if (response.ok){
            return response.json();
        } else {
            throw new Error("Not Working")
        }
    }).then(function(data){
        console.log(data[0]);

        var latNum = data[0].lat
        var lonNum = data[0].lon

        console.log(latNum)
        console.log(lonNum)

        var cityList = document.createElement("section");
        cityList.textContent = data[0].name
        searchResults.appendChild(cityList)
        fiveDayForecast()


    function fiveDayForecast(){
        var fiveDayUrl =  "http://api.openweathermap.org/data/2.5/forecast?lat=" + latNum
    + "&lon=" + lonNum + "&units=imperial" + "&appid=5a69d7be0eb17b91b671817abaaadbbb";
        console.log(fiveDayUrl)
        fetch(fiveDayUrl).then(function(response){
        if (response.ok){
            return response.json();
        }else {
            throw new Error("Not Working")
        }
        }).then(function(data){
            console.log(data)
            for (var i = 0; i < data.list.length; i++){
                var results = data.list[i];
                console.log(results)
                
                forecastDayOneTitle.textContent = data.list[0].dt_txt
                weatherDayOne.textContent = data.list[0].weather[0].description
                imageOne.src = " http://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + "@2x.png"
                weatherTempOne.textContent = "Temp: " + data.list[0].main.temp + "°F"
                windOne.textContent = "Wind: " + data.list[0].wind.speed + " MPH"

                forecastDayTwoTitle.textContent = data.list[8].dt_txt
                weatherDayTwo.textContent = data.list[8].weather[0].description
                imageTwo.src = " http://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + "@2x.png"
                weatherTempTwo.textContent = "Temp: " + data.list[8].main.temp + "°F"
                windTwo.textContent = "Wind: " + data.list[8].wind.speed + " MPH"
            }
        })
    
    }

    })


};





// api.openweathermap.org/data/2.5/forecast?id=524901&appid={5a69d7be0eb17b91b671817abaaadbbb}

// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=

// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}