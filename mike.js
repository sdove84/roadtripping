$(document).ready(function() {
    $('#actionSubmit').click(function(){
        checkForCheckedValues();
        initiMapPlaces();
    });
});

var map;
var infowindow;
var checkedBoxes = [];



// ---------------------------------------Start of google places api---------------------------------------------------

//CheckForCheckedValues takes the values from checked boxes and pushes them to array
function checkForCheckedValues(){
    $("input[type=checkbox]:checked").each(function() {
        checkedBoxes.push($(this).val() );
    });
    console.log("users picks to have displayed:" +" "+checkedBoxes);
}

// initiMapPlaces HARDCODED laguna Beach as the initial view will need to be changed to users geoLocation
function initiMapPlaces() {
    var lagunaBeach = {lat: 33.541679, lng: -117.777214};
    map = new google.maps.Map(document.getElementById('map'), {
        center: lagunaBeach,
        zoom: 12
    });
    //The object below is hard coded to show results within the radius if irvine needs to be changed to either   route
    //or to users geoLocation. Name is the values of what will be searched for based off the checked values
    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: lagunaBeach,
        radius: 8046.72, // 5 mile radius search
        types: checkedBoxes
    }, callbackPlaces);
}

//callbackPlaces function sorts through all the results
function callbackPlaces(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarkerPlaces(results[i]);
        }
    }
}

// createMarkerPlaces places the marker
function createMarkerPlaces(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: placeLoc
    });

    // If the marker is clicked the name of that result is shown MAYBE want to add what additional data is displayed
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}
//---------------------------------------End of google places api-------------------------------------------------------


// client ID:   30315203349-jd80sfb669777fd6d1dfterfccd6c8bq.apps.googleusercontent.com
// client secret:   klXp63ZEWeJ8DvO7npLy7RvE

//----------------------------------------Start of Google Sign In-------------------------------------------------------

function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token); // The ID token you need to pass to your backend:
};

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

//-----------------------------------------End of Google Sign in--------------------------------------------------------