var map,marker;
var marker_created = [];

function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var myLatLng = {lat: 33.6361719, lng: -117.73962320000001};

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: myLatLng,
        zoomControl: false,
        streetViewControlL: false,
        scrollWheel:false,
        disableDefaultUI: true // a way to quickly hide all controls

        // styles: [
        //     {
        //         featureType:'water',
        //         stylers:[{ color: '#599459'}]
        //     }
        // ]
    });

    marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Hello World!',
        draggable:true //enable to move marker
    });

    //making infowindow
    var contentString = '<div id="direction">' + '<p>You\'re here</p>' + '</div>';

    var infowindow = new google.maps.InfoWindow({
        content:contentString,
        maxwidth:300,
    });

    //when click on marker
    marker.addListener('click',function(){
        infowindow.open(map,marker);
    });
    //end infowindow
    map.addListener('click',function(){
        infowindow.close();
    });
    //when the marker start
    google.maps.event.addDomListener(marker, 'dragstart',function(event){
        console.log('start' , event);
    });

    //when the marker end
    google.maps.event.addDomListener(marker, 'dragend',function(event){
        console.log('here is Lat and Lng' , event.latLng.lat(), event.latLng.lng());
        getNewMarker();
        map.setZoom(4);
    });

    var infoWindow = new google.maps.InfoWindow({map: map});

    function GeolocationControl(){//get current location
        var geoButton = document.getElementById('current-location');
        google.maps.event.addDomListener(geoButton, 'click' ,geolocate);
    }

    function geolocate(){
        console.log('cung');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                console.log(position);
                //Geoposition {coords: Coordinates, timestamp: 1484769925428}
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                console.log('here is pos', pos);
                map.setCenter(pos);
                marker.setPosition(pos);
            }, function() {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    } //end geolocation

    var markers = [
        {'coord':{lat:41.032551361339564, lng: -120.200605},'title':'title infoWindow1'},
        {'coord':{lat:40.09783099324514, lng: -114.311933125},'title':'title infoWindow2'},
        {'coord':{lat:36.24742727182658 , lng:  -107.93981851249998},'title':'title infoWindow3'},
        {'coord':{lat:46.561549402547634 , lng: -102.31481851249998},'title':'title infoWindow4'}
    ];

    function getNewMarker(){
        for (var i = 0; i<markers.length; i++){
            var item = createMarkers(markers[i]);
            // marker_created.push(item);
            // console.log(marker_created);
        }
    }

    function createMarkers(pos){
        var newMarker = new google.maps.Marker({
            position: pos.coord,
            map: map
        });
        var contentString2 = '<div>' + '<p><a href="#" class = "direction">'+ pos.title+'</a></p>' + '</div>';

        var infoWindow2 = new google.maps.InfoWindow({
            content: contentString2
        });

        //create info window for locations
        infoWindow2.addListener('domready',function(){
            $('.direction').on('click',function(){
                calculateAndDisplayRoute(infoWindow2,newMarker);//truyen newmarker vao de lay vi tri 2
            });
        });
        //when location marker clicked
        newMarker.addListener('click',function(){
            infoWindow2.open(map,newMarker);
        });
        return newMarker;
    }

    function calculateAndDisplayRoute(infoWindow,newMarker) {//direction service
        infoWindow.close();
        directionsDisplay.setMap(map);
        directionsService.route({
            origin: marker.getPosition(), //starting location
            destination: newMarker.getPosition(), //end location
            travelMode: google.maps.TravelMode.DRIVING
        }, function(response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
        console.log('cung',getPath());
    }

    GeolocationControl();

}

