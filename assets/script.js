var apiKey = "05da83faa28532e9953c078bb342b0b7";
var cityInput = "";
historyArray = [];
var hisIndex = 0;

$(document).ready(function () {
  var locHis = localStorage.getItem("historyArray");
  var locHisArray = locHis.split(",");
  console.log(locHisArray);

  historyArray = locHisArray;

  locHisArray.forEach(function (Element) {
    var selectUl = document.getElementById("buttonMemory");
    var createLi = document.createElement("li");

    selectUl.setAttribute("class", "row");

    createLi.setAttribute("class", "btn col-10");
    createLi.setAttribute("id", Element);
    createLi.textContent = Element;

    selectUl.appendChild(createLi);
  });

  $("#submitButton").on("click", function (event) {
    event.preventDefault();

    var inputValue = $("#city-input").val();

    baseFunction(inputValue);

    var selectUl = document.getElementById("buttonMemory");
    var createLi = document.createElement("li");

    selectUl.setAttribute("class", "row");

    createLi.setAttribute("class", "btn col-10");
    createLi.setAttribute("id", inputValue);
    createLi.textContent = inputValue;

    selectUl.appendChild(createLi);

    historyArray.push(inputValue);
    console.log(historyArray);
  });

  $("#buttonMemory").on("click", function (event) {
    event.preventDefault();
    console.log("buttonpress");
    baseFunction(event.target.id);
  });

  function baseFunction(inputValue) {
    $("#city-input").val("");

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
        tWind = Math.round(tWind * 2.23694) + " mph";

        todayWind.textContent = tWind;

        var tHumidity = data.main.humidity;

        todayHumidity.textContent = tHumidity + "%";

        console.log(historyArray);

        localStorage.setItem("historyArray", historyArray);

        var queryUrl5Day =
          "https://api.openweathermap.org/data/2.5/forecast?q=" +
          cityInput +
          "&appid=" +
          apiKey;

        fetch(queryUrl5Day)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data);

            var dateD1Id = document.getElementById("date1");
            var emojiD1Id = document.getElementById("emoji1");
            var tempD1Id = document.getElementById("tempD1");
            var windD1Id = document.getElementById("windD1");
            var humidityD1Id = document.getElementById("humidity1");

            var date1 = data.list[0].dt_txt;
            date1Array = date1.split(" ");
            dateD1Id.textContent = date1Array[0];

            var emojiD1 = data.list[0].weather[0].icon;
            emojiD1Id.setAttribute(
              "src",
              "http://openweathermap.org/img/wn/" + emojiD1 + "@2x.png"
            );

            var tempD1 = data.list[0].main.temp;
            tempD1 = (Math.round(tempD1 - 273.15) * 9) / 5 + 32;
            tempD1 = tempD1 + " deg F";
            tempD1Id.textContent = "Temp: " + tempD1;

            var windD1 = data.list[0].wind.speed;
            windD1 = Math.round(windD1 * 2.23694) + " mph";
            windD1Id.textContent = "Wind: " + windD1;

            var humidityD1 = data.list[0].main.humidity;
            humidityD1Id.textContent = "Humid: " + humidityD1 + "%";
          });
      });
  }
});
