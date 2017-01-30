$(document).ready(function() {
    $('#actionSubmit').click(function(){
        checkForCheckedValues();
        startPlaces();


    });
});


var map;
var checkedBoxes = [];
var loc = {};
var geocoder;

function initMap() {
    geocoder = new google.maps.Geocoder;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    map = new google.maps.Map(document.getElementById('map'), {
        mapTypeControl: false,
        center: {lat: 37.0902, lng: -95.7129},
        zoom: 4
    });
    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);
//        weatherLayer = new google.maps.weather.WeatherLayer({
//            temperatureUnits: google.maps.weather.TemperatureUnit.FAHRENHEIT
//        });
    new AutocompleteDirectionsHandler(map);
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('right-panel'));
//        var control = document.getElementById('floating-panel');
//        control.style.display = 'block';
//        map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
    var onChangeHandler = function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    };
//        document.getElementById('start').addEventListener('change', onChangeHandler);
//        document.getElementById('end').addEventListener('change', onChangeHandler);
}
/**
 * @constructor
 */
function AutocompleteDirectionsHandler(map) {
    this.map = map;
    this.originPlaceId = null;
    this.destinationPlaceId = null;
    this.travelMode = 'DRIVING';
    var originInput = document.getElementById('origin-input');
    var destinationInput = document.getElementById('destination-input');
    var modeSelector = document.getElementById('mode-selector');
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;
    this.directionsDisplay.setMap(map);
    var originAutocomplete = new google.maps.places.Autocomplete(
        originInput, {placeIdOnly: true});
    var destinationAutocomplete = new google.maps.places.Autocomplete(
        destinationInput, {placeIdOnly: true});
//        this.setupClickListener('changemode-walking', 'WALKING');
//        this.setupClickListener('changemode-transit', 'TRANSIT');
    this.setupClickListener('changemode-driving', 'DRIVING');
    this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
    this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
}
//     Sets a listener on a radio button to change the filter type on Places
//     Autocomplete.
AutocompleteDirectionsHandler.prototype.setupClickListener = function(id, mode) {
    var radioButton = document.getElementById(id);
    var me = this;
    radioButton.addEventListener('click', function() {
        me.travelMode = mode;
        me.route();
    });
};
AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function(autocomplete, mode) {
    var me = this;
    autocomplete.bindTo('bounds', this.map);
    autocomplete.addListener('place_changed', function() {
        var place = autocomplete.getPlace();
        if (!place.place_id) {
            window.alert("Please select an option from the drop down list.");
            return;
        }
        if (mode === 'ORIG') {
            me.originPlaceId = place.place_id;
            geocoder.geocode({'placeId': place.place_id}, function(results){
                var latLng = results[0].geometry.location ;
                loc.lat = latLng.lat();
                loc.lng = latLng.lng();
            });

        } else {
            me.destinationPlaceId = place.place_id;
        }
        me.route();
    });
};
AutocompleteDirectionsHandler.prototype.route = function() {
    if (!this.originPlaceId || !this.destinationPlaceId) {
        return;
    }
    var me = this;
    this.directionsService.route({
        origin: {'placeId': this.originPlaceId},
        destination: {'placeId': this.destinationPlaceId},
        travelMode: this.travelMode
    }, function(response, status) {
        if (status === 'OK') {
            me.directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
};


<!-- Mikes JS-->

function checkForCheckedValues(){
    $("input[type=checkbox]:checked").each(function() {
        checkedBoxes.push($(this).val() );
    });
    console.log("users picks to have displayed:" +" "+ checkedBoxes);
}

function startPlaces() {
    var dataStartPoint = loc;
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: dataStartPoint,
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
}
<!-- JS nav bar on home page -->
function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
<!-- JS nav bar on index page -->
function openNav2() {
    document.getElementById("mySidenav2").style.width = "50%";
}

function closeNav2(){
    document.getElementById("mySidenav2").style.width = "0";
}



