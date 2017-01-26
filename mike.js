$(document).ready(function() {
    $('#actionSubmit').click(function(){
        checkForCheckedValues();
        initMap();


    });
});

var map;
var checkedBoxes = [];



// ---------------------------------------Start of google places api---------------------------------------------------
function checkForCheckedValues(){
    $("input[type=checkbox]:checked").each(function() {
        checkedBoxes.push($(this).val() );
    });
    console.log("users picks to have displayed:" +" "+ checkedBoxes);
}

function initMap() {
    var Irvine = {lat: 33.6694444, lng: -117.8222222};
    map = new google.maps.Map(document.getElementById('map'), {
        center: Irvine ,
        zoom: 12
    });
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: Irvine,
        radius: 16093.4, //10 Mile radius
        name: checkedBoxes
    }, processResults);
}

function processResults(results, status, pagination) {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
        return;
    } else {
        createMarkers(results);

        if (pagination.hasNextPage) {
            var moreButton = document.getElementById('more');

            moreButton.disabled = false;

            moreButton.addEventListener('click', function() {
                moreButton.disabled = true;
                pagination.nextPage();
            });
        }
    }
}

function createMarkers(places) {
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
        var name = place.name;
        var address = places[i].vicinity;
        var content =
            '<div class="infoWindow">'+
                '<h1 class="infoPlaceName">'+ name+ '</h1>'+
                '<h5 class="infoPlaceAddress>">'+ address+'</h5>'+
            '</div>';

        var image = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        };

        let marker = new google.maps.Marker({
            map: map,
            icon: image,
            title: place.name,
            position: place.geometry.location
        });

        let infoWindow = new google.maps.InfoWindow({
            content: content


        });

        marker.addListener('click',function(){
            infoWindow.open(map,marker);
        });

        bounds.extend(place.geometry.location);
    }
    map.fitBounds(bounds);
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

