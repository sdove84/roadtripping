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
function checkForCheckedValues(){
    $("input[type=checkbox]:checked").each(function() {
        checkedBoxes.push($(this).val() );
    });
    console.log("users picks to have displayed:" +" "+ checkedBoxes);
}

function initiMapPlaces() {
    var Irvine = {lat: 33.6694444, lng: -117.8222222};
    map = new google.maps.Map(document.getElementById('map'), {
        center: Irvine,
        zoom: 12
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: Irvine,
        radius: 11265.4, // 7 mile radius search
        name: checkedBoxes
    }, callbackPlaces)
}

function callbackPlaces(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarkerPlaces(results[i]);
        }
    }
}

function createMarkerPlaces(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: placeLoc
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}
//---------------------------------------End of google places api-------------------------------------------------------


//----------------------------------------Start of Google Sign In-------------------------------------------------------
// client ID:   30315203349-jd80sfb669777fd6d1dfterfccd6c8bq.apps.googleusercontent.com
// client secret:   klXp63ZEWeJ8DvO7npLy7RvE

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

