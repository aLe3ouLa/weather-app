/** GEOLOCATION API  */
/** This function will identify the users' location */
/** The Geolocation API protects the user’s privacy by mandating that the user permission should be sought and obtained before sending the location information of the user to any website */
var getCurrentLocation = function() {
  // Get the user's current position
  var positionOptions = {
    enableHighAccuracy: true, // if true the user agent will try to provide the most accurate position
    timeout: Infinity, // the max time the user agent will take to respond with location data
    maximumAge: 0 //how long the user agent can keep using the cached location data
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      showPosition, // Success callback function
      showError, // Error callback function
      positionOptions // Position options
    );  
  } else {
    // Geolocation not supported
    console.log("Geolocation is not supported in your browser");
  }
};

function showPosition(position) {
  // Success callback function
  console.log(
    "Latitude: " +
      position.coords.latitude +
      "Longitude: " +
      position.coords.longitude
  );
  initMap(position.coords.latitude, position.coords.longitude);
  document.getElementById("weather-container--Latitude").innerHTML = position.coords.latitude;
  document.getElementById("weather-container--Longitude").innerHTML = position.coords.longitude;

}

function showError(error) {
    // Error callback function
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.log("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      console.log("An unknown error occurred.");
      break;
  }
}

function getCurrentDate() {
    console.log(new Date())
    document.getElementById('weather-current-date').innerHTML = formatDate(new Date());
}

function formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }
  
/** Initialize map from google API */
  function initMap(lat, lng) {
    // The location of user
    var currentPos = { lat: lat, lng: lng };
    // The map, centered at Athens
    var map = new google.maps.Map(document.getElementById("googleMap"), {
      zoom: 15,
      center: currentPos
    });
    // The marker, positioned at Athens
    var marker = new google.maps.Marker({ position: currentPos, map: map });
  }