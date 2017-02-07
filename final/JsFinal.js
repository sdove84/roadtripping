$(document).ready(function(){
    $("#mode-selector").hide();
    $("#getDirectionsButton").hide();

    $('#actionSubmit').click(function(){
        slicedNodes();

        checkForCheckedValues();
        startPlaces(nodesToCheck);
        startPlaces(nodesToCheck2);
        startPlaces(nodesToCheck3);
        startPlaces(nodesToCheck4);
        startPlaces(nodesToCheck5);
        startPlaces(nodesToCheck6);

    });
    // $('#submit_event').click(function (){
    //     getResults();
    // });

    $('#submit_event').on('click', function() {
        getResults();
    });
});

var map;
var checkedBoxes = [];
var loc = {};
var geocoder;
var trafficLayer= null;
var nodes = null;
var nodesToCheck = null;
var nodesToCheck2 = null;
var nodesToCheck3 = null;
var nodesToCheck4 = null;
var nodesToCheck5 = null;
var nodesToCheck6 = null;
var marker_event;
var infowindow;
var destination = null;
var city = null;
var state = null;



function initMap() {
    geocoder = new google.maps.Geocoder;
    directionsDisplay = new google.maps.DirectionsRenderer;
    map = new google.maps.Map(document.getElementById('map'), {
        mapTypeControl: false,
        center: {lat: 37.0902, lng: -95.7129},
        zoom: 4
    });
    new AutocompleteDirectionsHandler(map);
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
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;
    this.directionsDisplay.setMap(map);


    this.directionsDisplay.setPanel(document.getElementById('mySidenav3'));
    var originAutocomplete = new google.maps.places.Autocomplete(
        originInput, {placeIdOnly: true});
    var destinationAutocomplete = new google.maps.places.Autocomplete(
        destinationInput, {placeIdOnly: true});

    console.log('omg',destinationAutocomplete);

    this.setupClickListener('changemode-driving', 'DRIVING');
    this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
    this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);
}



/**
 *Create event Marker and info_window for marker
 */

function create_event_marker(result,lat,lng){
     marker_event = new google.maps.Marker({
         position: {lat: lat, lng: lng},
         map: map,
         icon:'images/location_pin_marker.png'
    });
    create_info_event(marker_event,result);
}

function create_info_event(pos,result){
    var contentString2 = '<div>' + '<p>'+ result.title+'</p>' + '</div>';
    contentString2 += '<br>' + result.city_name;
    var infoWindow2 = new google.maps.InfoWindow({
        content: contentString2
    });

    //create info window for locations
    // infoWindow2.addListener('domready',function(){
    //     $('.direction').on('click',function(){
    //         calculateAndDisplayRoute(infoWindow2,newMarker);//truyen newmarker vao de lay vi tri 2
    //     });
    // });
    //when location marker clicked
    pos.addListener('click',function(){
        infoWindow2.open(map,pos);
    });
    return pos;
}
    AutocompleteDirectionsHandler.prototype.setupClickListener = function(id, mode) {

    var radioButton = document.getElementById(id);
    var me = this;
    radioButton.addEventListener('click', function () {
        me.travelMode = mode;
        me.route();
    });
};

AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function (autocomplete, mode) {
    var me = this;
    autocomplete.bindTo('bounds', this.map);
    autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();
        if (!place.place_id) {
            window.alert("Please select an option from the drop down list.");
            return;
        }
        if (mode === 'ORIG') {
            me.originPlaceId = place.place_id;
            geocoder.geocode({'placeId': place.place_id}, function (results) {
                var latLng = results[0].geometry.location;
                loc.lat = latLng.lat();
                loc.lng = latLng.lng();
            });

        } else {
            me.destinationPlaceId = place.place_id;
        }
        destination = $("#destination-input").val();
        me.route();
    });

};


//auto complete showing route function
AutocompleteDirectionsHandler.prototype.route = function() {
    if (!this.originPlaceId || !this.destinationPlaceId) {
        return;
    }
    cityStateDestination();
    var me = this;
    this.directionsService.route({
        origin: {'placeId': this.originPlaceId},
        destination: {'placeId': this.destinationPlaceId},
        travelMode: this.travelMode

    }, function (response, status) {
        if (status === 'OK') {
            console.log('cung',response);
            me.directionsDisplay.setDirections(response);
            route = response.routes[0];
            var path = response.routes[0].overview_path;

            var currentI = 0;
            nodes = [path[0]];
            for(var i =1; i< path.length; i++ ){
                var firstLat = path[currentI].lat();
                var firstLng = path[currentI].lng();
                var secondLat = path[i].lat();
                var secondLng = path[i].lng();
                var solutionLat = Math.pow((secondLat-firstLat),2);
                var solutionLng = Math.pow((secondLng-firstLng),2);
                var squareRoot = Math.sqrt(solutionLng + solutionLat);
                var check = squareRoot * 69 ;
                if(check>20){
                    nodes.push(path[currentI]);
                    currentI = i;
                    console.log("This counts as one places google places api");
                }
            }
            nodes.push(path[path.length-1]);
            $("#getDirectionsButton").show();
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
    //marker for events
    getInformation();
};


<!-- Mikes JS-->

function checkForCheckedValues(){
    checkedBoxes=[];
    $("input[type=checkbox]:checked").each(function() {
        checkedBoxes.push($(this).val() );
    });
    console.log("users picks to have displayed:" +" "+ checkedBoxes);
}

function slicedNodes() {
    nodesToCheck = nodes.slice();
    var splitPoint = Math.ceil(nodesToCheck.length / 6);
    nodesToCheck2 = nodesToCheck.splice(splitPoint);
    splitPoint = Math.ceil(nodesToCheck.length / 5);
    nodesToCheck3 = nodesToCheck2.splice(splitPoint);
    splitPoint = Math.ceil(nodesToCheck.length / 4);
    nodesToCheck4 = nodesToCheck3.splice(splitPoint);
    splitPoint = Math.ceil(nodesToCheck.length / 3);
    nodesToCheck5 = nodesToCheck4.splice(splitPoint);
    splitPoint = Math.ceil(nodesToCheck.length / 2);
    nodesToCheck6 = nodesToCheck5.splice(splitPoint);

}

function startPlaces(nodes) {
    if(nodes.length == 0){
        return;
    }
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: nodes[0],
        radius: 8046.72, //5 Mile radius
        name: checkedBoxes
    }, function(results, status, pagination){
        nodes.shift();
        startPlaces(nodes);
        processResults(results, status, pagination);
    });
}

function processResults(results, status, pagination) {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
        return;
    } else {
        createMarkers(results);
        if (pagination.hasNextPage) {
            pagination.nextPage();
            }
    }
}



function createMarkers(places) {
    var  markersArray = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
        var name = place.name;
        var address = places[i].vicinity;
        var content =
            '<div class="infoWindow">' +
            '<h1 class="infoPlaceName">' + name + '</h1>' +
            '<h5 class="infoPlaceAddress>">' + address + '</h5>' +
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
        markersArray.push(marker);
        marker.addListener('click', function () {
            infoWindow.open(map, marker);
        });

        bounds.extend(place.geometry.location);

    }
    var markerCluster = new MarkerClusterer(map, markersArray,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

}
<!-- JS nav bar on home page -->
function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
    $('.text-center').hide();
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    $('.text-center').show();
}
<!-- JS nav bar on index page -->
function openNav2() {
    document.getElementById("mySidenav2").style.width = "250px";
    //document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}
function closeNav2() {
    document.getElementById("mySidenav2").style.width = "0";
}

<!-- JS nav bar for directions -->
function openNav3() {
    document.getElementById("mySidenav3").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}
function closeNav3() {
    document.getElementById("mySidenav3").style.width = "0";
}

function showTraffic() {
    if (document.getElementById('traffic').checked) {
        trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);

    } else {
        trafficLayer.setMap(null);
    }
}

/**
 *Identifies the City and State based on the destination
 * The City and State are going to be used for the weather input
 */
function cityStateDestination (){
    city = destination.split(",")[0];
    state = destination.split(",")[1];
    console.log("this is the city and state of the destination:" + city + " " + state);
}


function getWeather() {
    if (city == null && state == null) {
        alert("Please select route");
    }
    else {
        $.ajax({
            dataType: 'jsonp',
            method: "GET",
            url: 'http://api.wunderground.com/api/dd19086be18c6fc3/alerts/almanac/conditions/geolookup/forecast/q/' + state + '/' + city + '.json',
            success: function (result) {
                noAlerts(result);
                var weatherImage = $('<img>', {src: result.current_observation.icon_url});
                var location = result.current_observation.display_location.full;
                console.log(alertmessage);
                var temp = result.current_observation.temp_f + '&#176;' + ' F';
                var humidity = result.current_observation.relative_humidity;
                var wind = result.current_observation.relative_humidity;
                var pressure = result.current_observation.pressure_in;
                $('#weatherImage').append(weatherImage);
                $('#weatherLocation').append(location);
                $('#weatherAlerts').append(alertmessage);
                $('#weatherTemp').append(temp);
                $('#weatherHumidity').append(humidity);
                $('#weatherWind').append(wind);
                $('#weatherPressure').append(pressure);
            }

        })
    }
}

function noAlerts(result) {
    if (result.alerts.length === 0) {
        console.log('Test: ' + result.alerts);
        alertmessage = "No weather alerts.";
    } else {
        alertmessage = result.alerts[0].description;
    }
}



