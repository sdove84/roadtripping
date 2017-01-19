$(document).ready(function() {
    $('#actionSubmit').click(function(){
        checkForCheckedValues();
        initMap();
    });
});

var map;
var infowindow;
var checkedBoxes = [];

//CheckForCheckedValues takes the values from checked boxes and pushes them to array
function checkForCheckedValues(){
    $("input[type=checkbox]:checked").each(function() {
        checkedBoxes.push($(this).val() );
    });
    console.log("users picks to have displayed:" +" "+checkedBoxes);
}

// initMap HARDCODED irvine as the initial view will need to be changed to users geoLocation
function initMap() {
    var irvine = {lat: 33.669, lng: -117.822};
    map = new google.maps.Map(document.getElementById('map'), {
        center: irvine,
        zoom: 10
    });

    //The object below is hard coded to show results within the radius if irvine needs to be changed to either route
    //or to users geoLocation. Name is the values of what will be searched for based off the checked values
    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: irvine,
        radius: 16093, // 10 mile radius search
        name: checkedBoxes
    }, callback);
}

//callback function sorts through all the results
function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

// createMarker places the marker
function createMarker(place) {
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