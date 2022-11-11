$(document).ready(function (){
        weatherApiUrl=https=//api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid=05da83faa28532e9953c078bb342b0b7
    

//add event listener and create function
    $("#submitButton").on("click", function(event){
        // stops the page from refreshing immediately 
        event.preventDefault();

        var cityInput = $("#city-input").val();
        console.log(cityInput);
    } )
        
}
)