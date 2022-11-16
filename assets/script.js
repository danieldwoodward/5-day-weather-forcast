var apiKey = "05da83faa28532e9953c078bb342b0b7";
var cityInput = "";
historyArray = [];
var hisIndex = 0;

$(document).ready(function () {
  var locHis = localStorage.getItem("historyArray");
  if (locHis !== null) {
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
  }

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
    var h4Title = document.getElementById("title-city");
    h4Title.textContent = inputValue;

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

            var dateD1Id = document.getElementById("dateD1");
            var emojiD1Id = document.getElementById("emojiD1");
            var tempD1Id = document.getElementById("tempD1");
            var windD1Id = document.getElementById("windD1");
            var humidityD1Id = document.getElementById("humidityD1");

            var dateD1 = data.list[0].dt_txt;
            var dateD1Array = dateD1.split(" ");
            dateD1Id.textContent = dateD1Array[0];

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

            console.log(data.list[8]);
            var dateD2Id = document.getElementById("dateD2");
            var emojiD2Id = document.getElementById("emojiD2");
            var tempD2Id = document.getElementById("tempD2");
            var windD2Id = document.getElementById("windD2");
            var humidityD2Id = document.getElementById("humidityD2");

            var date2 = data.list[8].dt_txt;
            var date2Array = date2.split(" ");
            dateD2Id.textContent = date2Array[0];

            var emojiD2 = data.list[8].weather[0].icon;
            console.log(emojiD2);
            emojiD2Id.setAttribute(
              "src",
              "http://openweathermap.org/img/wn/" + emojiD2 + "@2x.png"
            );

            var tempD2 = data.list[8].main.temp;
            tempD2 = (Math.round(tempD2 - 273.15) * 9) / 5 + 32;
            tempD2 = tempD2 + " deg F";

            tempD2Id.textContent = "Temp: " + tempD2;

            var windD2 = data.list[8].wind.speed;
            console.log(windD2);
            windD2 = Math.round(windD2 * 2.23694) + " mph";
            windD2Id.textContent = "Wind: " + windD2;

            var humidityD2 = data.list[8].main.humidity;
            console.log(humidityD2);

            humidityD2Id.textContent = "Humid: " + humidityD2 + "%";

            console.log(data.list[16]);
            var dateD3Id = document.getElementById("dateD3");
            var emojiD3Id = document.getElementById("emojiD3");
            var tempD3Id = document.getElementById("tempD3");
            var windD3Id = document.getElementById("windD3");
            var humidityD3Id = document.getElementById("humidityD3");

            var date3 = data.list[16].dt_txt;
            var date3Array = date3.split(" ");
            dateD3Id.textContent = date3Array[0];

            var emojiD3 = data.list[16].weather[0].icon;
            console.log(emojiD3);
            emojiD3Id.setAttribute(
              "src",
              "http://openweathermap.org/img/wn/" + emojiD3 + "@2x.png"
            );

            var tempD3 = data.list[16].main.temp;
            tempD3 = (Math.round(tempD3 - 273.15) * 9) / 5 + 32;
            tempD3 = tempD3 + " deg F";

            tempD3Id.textContent = "Temp: " + tempD3;

            var windD3 = data.list[16].wind.speed;
            console.log(windD3);
            windD3 = Math.round(windD3 * 2.23694) + " mph";
            windD3Id.textContent = "Wind: " + windD3;

            var humidityD3 = data.list[16].main.humidity;
            console.log(humidityD3);

            humidityD3Id.textContent = "Humid: " + humidityD3 + "%";

            console.log(data.list[24]);
            var dateD4Id = document.getElementById("dateD4");
            var emojiD4Id = document.getElementById("emojiD4");
            var tempD4Id = document.getElementById("tempD4");
            var windD4Id = document.getElementById("windD4");
            var humidityD4Id = document.getElementById("humidityD4");

            var date4 = data.list[24].dt_txt;
            var date4Array = date4.split(" ");
            dateD4Id.textContent = date4Array[0];

            var emojiD4 = data.list[24].weather[0].icon;
            console.log(emojiD4);
            emojiD4Id.setAttribute(
              "src",
              "http://openweathermap.org/img/wn/" + emojiD4 + "@2x.png"
            );

            var tempD4 = data.list[24].main.temp;
            tempD4 = (Math.round(tempD4 - 273.15) * 9) / 5 + 32;
            tempD4 = tempD4 + " deg F";

            tempD4Id.textContent = "Temp: " + tempD4;

            var windD4 = data.list[24].wind.speed;
            console.log(windD4);
            windD4 = Math.round(windD4 * 2.23694) + " mph";
            windD4Id.textContent = "Wind: " + windD4;

            var humidityD4 = data.list[24].main.humidity;
            console.log(humidityD4);

            humidityD4Id.textContent = "Humid: " + humidityD4 + "%";

            console.log(data.list[32]);
            var dateD5Id = document.getElementById("dateD5");
            var emojiD5Id = document.getElementById("emojiD5");
            var tempD5Id = document.getElementById("tempD5");
            var windD5Id = document.getElementById("windD5");
            var humidityD5Id = document.getElementById("humidityD5");

            var date5 = data.list[32].dt_txt;
            var date5Array = date5.split(" ");
            dateD5Id.textContent = date5Array[0];

            var emojiD5 = data.list[32].weather[0].icon;
            console.log(emojiD5);
            emojiD5Id.setAttribute(
              "src",
              "http://openweathermap.org/img/wn/" + emojiD5 + "@2x.png"
            );

            var tempD5 = data.list[32].main.temp;
            tempD5 = (Math.round(tempD5 - 273.15) * 9) / 5 + 32;
            tempD5 = tempD5 + " deg F";

            tempD5Id.textContent = "Temp: " + tempD5;

            var windD5 = data.list[32].wind.speed;
            console.log(windD5);
            windD5 = Math.round(windD5 * 2.23694) + " mph";
            windD5Id.textContent = "Wind: " + windD5;

            var humidityD5 = data.list[32].main.humidity;
            console.log(humidityD5);

            humidityD5Id.textContent = "Humid: " + humidityD5 + "%";
          });
      });
  }
});

// console.log(data.list[8]);
//             var dateD2Id = document.getElementById("date2");
//             var emojiD2Id = document.getElementById("emoji2");
//             var tempD2Id = document.getElementById("tempD2");
//             var windD2Id = document.getElementById("windD2");
//             var humidityD2Id = document.getElementById("humidity2");

//             var date2 = data.list[8].dt_txt;
//             date2Array = date2.split(" ");
//             dateD2Id.textContent = date1Array[0];

//             var emojiD2 = data.list[8].weather[0].icon;
//             console.log(emojiD2);
//             emojiD2Id.setAttribute(
//               "src",
//               "http://openweathermap.org/img/wn/" + emojiD2 + "@2x.png"
//             );

//             var tempD2 = data.list[8].main.temp;
//             tempD2 = (Math.round(tempD2 - 273.15) * 9) / 5 + 32;
//             tempD2 = tempD2 + " deg F";

//             tempD2Id.textContent = "Temp: " + tempD2;

//             var windD2 = data.list[8].wind.speed;
//             console.log(windD2);
//             windD2 = Math.round(windD2 * 2.23694) + " mph";
//             windD2Id.textContent = "Wind: " + windD2;

//             var humidityD2 = data.list[8].main.humidity;
//             console.log(humidityD2);

//             humidityD2Id.textContent = "Humid: " + humidityD2 + "%";

//             console.log(data.list[16]);
//             var dateD3Id = document.getElementById("date3");
//             var emojiD3Id = document.getElementById("emoji3");
//             var tempD3Id = document.getElementById("tempD3");
//             var windD3Id = document.getElementById("windD3");
//             var humidityD3Id = document.getElementById("humidity3");

//             var date3 = data.list[16].dt_txt;
//             date3Array = date3.split(" ");
//             dateD3Id.textContent = date1Array[0];

//             var emojiD3 = data.list[16].weather[0].icon;
//             console.log(emojiD3);
//             emojiD3Id.setAttribute(
//               "src",
//               "http://openweathermap.org/img/wn/" + emojiD3 + "@2x.png"
//             );

//             var tempD3 = data.list[16].main.temp;
//             tempD3 = (Math.round(tempD3 - 273.15) * 9) / 5 + 32;
//             tempD3 = tempD3 + " deg F";

//             tempD3Id.textContent = "Temp: " + tempD3;

//             var windD3 = data.list[16].wind.speed;
//             console.log(windD3);
//             windD3 = Math.round(windD3 * 2.23694) + " mph";
//             windD3Id.textContent = "Wind: " + windD3;

//             var humidityD3 = data.list[16].main.humidity;
//             console.log(humidityD3);

//             humidityD3Id.textContent = "Humid: " + humidityD3 + "%";

//             console.log(data.list[24]);
//             var dateD4Id = document.getElementById("date4");
//             var emojiD4Id = document.getElementById("emoji4");
//             var tempD4Id = document.getElementById("tempD4");
//             var windD4Id = document.getElementById("windD4");
//             var humidityD4Id = document.getElementById("humidity4");

//             var date4 = data.list[24].dt_txt;
//             date4Array = date4.split(" ");
//             dateD4Id.textContent = date1Array[0];

//             var emojiD4 = data.list[24].weather[0].icon;
//             console.log(emojiD4);
//             emojiD4Id.setAttribute(
//               "src",
//               "http://openweathermap.org/img/wn/" + emojiD4 + "@2x.png"
//             );

//             var tempD4 = data.list[24].main.temp;
//             tempD4 = (Math.round(tempD4 - 273.15) * 9) / 5 + 32;
//             tempD4 = tempD4 + " deg F";

//             tempD4Id.textContent = "Temp: " + tempD4;

//             var windD4 = data.list[24].wind.speed;
//             console.log(windD4);
//             windD4 = Math.round(windD4 * 2.23694) + " mph";
//             windD4Id.textContent = "Wind: " + windD4;

//             var humidityD4 = data.list[24].main.humidity;
//             console.log(humidityD4);

//             humidityD4Id.textContent = "Humid: " + humidityD4 + "%";

//             console.log(data.list[32]);
//             var dateD5Id = document.getElementById("date5");
//             var emojiD5Id = document.getElementById("emoji5");
//             var tempD5Id = document.getElementById("tempD5");
//             var windD5Id = document.getElementById("windD5");
//             var humidityD5Id = document.getElementById("humidity5");

//             var date5 = data.list[32].dt_txt;
//             date5Array = date5.split(" ");
//             dateD5Id.textContent = date1Array[0];

//             var emojiD5 = data.list[32].weather[0].icon;
//             console.log(emojiD5);
//             emojiD5Id.setAttribute(
//               "src",
//               "http://openweathermap.org/img/wn/" + emojiD5 + "@2x.png"
//             );

//             var tempD5 = data.list[32].main.temp;
//             tempD5 = (Math.round(tempD5 - 273.15) * 9) / 5 + 32;
//             tempD5 = tempD5 + " deg F";

//             tempD5Id.textContent = "Temp: " + tempD5;

//             var windD5 = data.list[32].wind.speed;
//             console.log(windD5);
//             windD5 = Math.round(windD5 * 2.23694) + " mph";
//             windD5Id.textContent = "Wind: " + windD5;

//             var humidityD5 = data.list[32].main.humidity;
//             console.log(humidityD5);

//             humidityD5Id.textContent = "Humid: " + humidityD5 + "%";
