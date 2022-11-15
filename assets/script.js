var apiKey = "05da83faa28532e9953c078bb342b0b7";
var cityInput = "";


$(document).ready(function () {



        $("#submitButton").on("click", function (event) {
                event.preventDefault();
            
                var inputValue = $("#city-input").val();

                inputValue.empty();

                console.log(inputValue);

                baseFunction(inputValue);
        });

        // $("ul li").on ("click", function (event){
        //         event.preventDefault();

                
        // })

  
  
function baseFunction(inputValue){

    var cityInput = inputValue.split(" ").join("+");

    var queryUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityInput +
      "&appid=" +
      apiKey;

    console.log(queryUrl);

    fetch(queryUrl)
      .then(function (response) {
        return response.json();
      })

      .then(function (data) {
        console.log(data);

        var todayTemp = document.getElementById("temp");
        var todayWind = document.getElementById("wind");
        var todayHumidity = document.getElementById("humid");

        var tTemp = data.main.temp;
        tTemp = (Math.round(tTemp - 273.15) * 9) / 5 + 32;
        tTemp = tTemp + " degrees F";

        todayTemp.textContent = tTemp;

        var tWind = data.wind.speed;
        tWind = Math.round(tWind*2.23694) + " mph";

        todayWind.textContent = tWind;

        var tHumidity = data.main.humidity;

        todayHumidity.textContent = tHumidity + "%";

        console.log(inputValue);


        var selectUl = document.getElementById("buttonMemory");
        var createLi = document.createElement("li");

        selectUl.setAttribute("class","row")

        createLi.setAttribute("class","btn col-10")
        createLi.textContent = inputValue;
        
        selectUl.appendChild(createLi);

        var createdButton = {
                name: inputValue,
                windSpeed: tWind,
                temputure: tTemp,
                humidity: tHumidity,
        }




              localStorage.setItem("createdButton", JSON.stringify(createdButton));


        
      });

  };

});


