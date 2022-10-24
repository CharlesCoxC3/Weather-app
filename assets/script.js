var searchInput = document.querySelector("#search-input")
var searchButton = document.querySelector("#button-addon2")
var searchResults = document.querySelector("#search-results")
var forecastContainer = document.querySelector(".hidden")
var latNum
var lonNum
var cityName = document.querySelector("#cityName")

var forecastDayOneTitle = document.querySelector("#forecastDay1")
var weatherDayOne = document.querySelector("#weatherText1")
var weatherTempOne = document.querySelector("#weatherTemp1")
var windOne = document.querySelector("#wind1")
var imageOne = document.querySelector("#img1")
var humOne = document.querySelector("#hum1")


var forecastDayTwoTitle = document.querySelector("#forecastDay2")
var weatherDayTwo = document.querySelector("#weatherText2")
var weatherTempTwo = document.querySelector("#weatherTemp2")
var windTwo = document.querySelector("#wind2")
var imageTwo = document.querySelector("#img2")
var humTwo = document.querySelector("#hum2")

var forecastDayThreeTitle = document.querySelector("#forecastDay3")
var weatherDayThree = document.querySelector("#weatherText3")
var weatherTempThree = document.querySelector("#weatherTemp3")
var windThree = document.querySelector("#wind3")
var imageThree = document.querySelector("#img3")
var humThree = document.querySelector("#hum3")

var forecastDayFourTitle = document.querySelector("#forecastDay4")
var weatherDayFour = document.querySelector("#weatherText4")
var weatherTempFour = document.querySelector("#weatherTemp4")
var windFour = document.querySelector("#wind4")
var imageFour = document.querySelector("#img4")
var humFour = document.querySelector("#hum4")

var forecastDayFiveTitle = document.querySelector("#forecastDay5")
var weatherDayFive = document.querySelector("#weatherText5")
var weatherTempFive = document.querySelector("#weatherTemp5")
var windFive = document.querySelector("#wind5")
var imageFive = document.querySelector("#img5")
var humFive = document.querySelector("#hum5")

searchButton.addEventListener("click", function(){
    var searchQuery = searchInput.value
    console.log(searchQuery)
    citySearch(searchQuery)
});

searchInput.addEventListener("submit",function(event){
    event.preventDefault()
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
            cityName.textContent = data.city.name
            for (var i = 0; i < data.list.length; i++){
                var results = data.list[i];
                console.log(results)

                forecastDayOneTitle.textContent = moment.unix(data.list[0].dt).format('MMM Do, YYYY, hh:mm A')
                weatherDayOne.textContent = data.list[0].weather[0].description
                imageOne.src = " http://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + "@2x.png"
                weatherTempOne.textContent = "Temp: " + data.list[0].main.temp + "°F"
                windOne.textContent = "Wind: " + data.list[0].wind.speed + " MPH"
                humOne.textContent = "Humidity: " + data.list[0].main.humidity + "%"

                forecastDayTwoTitle.textContent = moment.unix(data.list[8].dt).format('MMM Do, YYYY, hh:mm A')
                weatherDayTwo.textContent = data.list[8].weather[0].description
                imageTwo.src = " http://openweathermap.org/img/wn/" + data.list[8].weather[0].icon + "@2x.png"
                weatherTempTwo.textContent = "Temp: " + data.list[8].main.temp + "°F"
                windTwo.textContent = "Wind: " + data.list[8].wind.speed + " MPH"
                humTwo.textContent = "Humidity: " + data.list[8].main.humidity + "%"

                forecastDayThreeTitle.textContent = moment.unix(data.list[16].dt).format('MMM Do, YYYY, hh:mm A')
                weatherDayThree.textContent = data.list[16].weather[0].description
                imageThree.src = " http://openweathermap.org/img/wn/" + data.list[16].weather[0].icon + "@2x.png"
                weatherTempThree.textContent = "Temp: " + data.list[16].main.temp + "°F"
                windThree.textContent = "Wind: " + data.list[16].wind.speed + " MPH"
                humThree.textContent = "Humidity: " + data.list[16].main.humidity + "%"

                forecastDayFourTitle.textContent = moment.unix(data.list[24].dt).format('MMM Do, YYYY, hh:mm A')
                weatherDayFour.textContent = data.list[24].weather[0].description
                imageFour.src = " http://openweathermap.org/img/wn/" + data.list[24].weather[0].icon + "@2x.png"
                weatherTempFour.textContent = "Temp: " + data.list[24].main.temp + "°F"
                windFour.textContent = "Wind: " + data.list[24].wind.speed + " MPH"
                humFour.textContent = "Humidity: " + data.list[24].main.humidity + "%"

                forecastDayFiveTitle.textContent = moment.unix(data.list[32].dt).format('MMM Do, YYYY, hh:mm A')
                weatherDayFive.textContent = data.list[32].weather[0].description
                imageFive.src = " http://openweathermap.org/img/wn/" + data.list[32].weather[0].icon + "@2x.png"
                weatherTempFive.textContent = "Temp: " + data.list[32].main.temp + "°F"
                windFive.textContent = "Wind: " + data.list[32].wind.speed + " MPH"
                humFive.textContent = "Humidity: " + data.list[32].main.humidity + "%"
            }
        })
    
    }

    })


};





// api.openweathermap.org/data/2.5/forecast?id=524901&appid={5a69d7be0eb17b91b671817abaaadbbb}

// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=

// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}