<?php
session_start();
if(isset($_SESSION['auth'])){

}else {
    header('Location:signin.php');
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>RoadTripping</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="styleFinal.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="https://apis.google.com/js/platform.js" async defer></script>
    <script src="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js"></script>
    <script src="JsFinal.js"></script>
    <script src="events_finder.js"></script>
    <script src="database.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAgbouMURMuy_zBO2i2WZX_UqBppNMQPvY&libraries=places&callback=initMap" defer></script>

    <script>

        function test(){
            console.log('hahahahaha');
            $.ajax({
                url: 'http://localhost/final/backend/display_data_from_database.php',
                type: "POST",
                dataType: 'json',
                data: ({
                    id:<?php echo $_SESSION['user_id']?>
                }),
                success: function(result){
                    console.log('cung',result);
                    $('#origin-input').val(result[0].origin);
                    $('#destination-input').val(result[0].destination);
                }
            });
        }
    </script>
</head>
<body>

<div id="mapPageMenuContainer" class="container-fluid">
    <div class="row">
        <span class="mapMenu col-sm-4" id="home2" onclick="openNav2()">&#9776;<span>Menu</span></span>
        <span class="col-sm-4" id="mapLogo">Roadtripping </span>
        <span class="col-sm-4" id="getDirectionsButton" onclick="openNav3()">Directions</span>
    </div>
    <button class="btn btn-info" onclick="test()">My last trip</button>
    <button id="save_places_to_database" class="btn btn-info">save places
    </button>

</div>

<div id="inputsContainer" class="container-fluid">
    <div class="row">
        <input id="origin-input" class="col-sm-5" type="text"
               placeholder="Enter a location">
        <input id="destination-input" class="col-sm-5" type="text"
               placeholder="Enter a destination">
    </div>
</div>

<div id="mode-selector" class="controls">
    <input name="type" id="changemode-driving">
    <label for="changemode-driving"></label>
</div>

<div id="mySidenav2" class="sidenav2">
    <a href="javascript:void(0)" class="closebtn" onclick="closeNav2()">&times;</a>
<!--    <a href="signin.html">Sign In</a>-->
<!--    <a href="create_new_account.html">Create Account</a>-->
    <a href="">My Account</a>
    <a id=displayData type="button">Choose Places</a>
    <a href="check_list.html" onclick="flipPage()">Pack/Shop List</a>
    <a id= "displayData2" type="button" data-toggle="modal" data-target="#myModal2" onclick="set_val_destination()">Find Event</a>
    <a onclick="getWeather()">Weather</a>
    <a href="signout.php"> Sign out </a>
    <div id="weatherDisplayContainer">
        <button class="accordion">Current Weather</button>
        <div class="panelAccordian">
            <div id="weatherImage"></div>
            <div id="weatherLocation"></div>
            <div id="weatherAlerts"></div>
            <div id="weatherTemp"></div>
            <div id="weatherHumidity"></div>
            <div id="weatherWind"></div>
        </div>
        <button class="accordion" id="weatherDOW1"></button>
        <div class="panelAccordian">
            <div id="weatherIcon1"></div>
            <div id="weatherHigh1"></div>
            <div id="weatherLow1"></div>
            <div id="weatherPrep1"></div>
            <div id="weatherWind1"></div>
        </div>
        <button class="accordion" id="weatherDOW2"></button>
        <div class="panelAccordian">
            <div id="weatherIcon2"></div>
            <div id="weatherHigh2"></div>
            <div id="weatherLow2"></div>
            <div id="weatherPrep2"></div>
        </div>
        <button class="accordion" id="weatherDOW3"></button>
        <div class="panelAccordian">
            <div id="weatherIcon3"></div>
            <div id="weatherHigh3"></div>
            <div id="weatherLow3"></div>
            <div id="weatherPrep3"></div>
        </div>
    </div>
</div>


<div id="mySidenav3" class="sidenav3">
    <a href="javascript:void(0)" class="closebtn" onclick="closeNav3()">&times;</a>
    <label id="directionsLabel"><input type="checkbox" id="traffic" onclick="showTraffic()"/>Show/Hide Traffic</label>
    <div id="right-panel"></div>
</div>

<div id="map"></div>

<div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Please select what data you would like to be displayed on your route</h4>
            </div>
            <div class="modal-body">
                <!-- first drop down -- Accommodations -->
                <div class="dropdown">
                    <button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">
                        <span class="glyphicon glyphicon-bed"></span>
                        <span class="caret"></span></button>
                    <ul class="dropdown-menu" role="menu" aria-labelledby="menu1">
                        <p>Accommodations:</p>
                        <li><a><input value="hotels" type="checkbox" name="acc_hotels"/>Hotels</a></li>
                        <li><a><input value="motel" type="checkbox" name = "acc_motels"/>Motels</a></li>
                        <li><a><input value="campground + rv_park" type="checkbox" name="acc_camping"/>Camping/RV Parks</a></li>
                    </ul>
                </div>
                <! --- second drop down Attractions -->
                <div class="dropdown">
                    <button class="btn btn-default dropdown-toggle" type="button" id="menu2" data-toggle="dropdown">
                        <span class="glyphicon glyphicon-camera"></span>
                        <span class="caret"></span></button>
                    <ul class="dropdown-menu" role="menu" aria-labelledby="menu1">
                        <p>Attractions</p>
                        <li><a><input value="amusement park" type="checkbox" name="att_amusement"/>Amusement Parks</a></li>
                        <li><a><input value="museums" type="checkbox" name="att_museums"/>Museums</a></li>
                        <li><a><input  value="zoo / aquarium" type="checkbox" name="att_zoo"/>Zoo/Aquarium</a></li>
                    </ul>
                </div>
                <!-- Third drop down Outdoors and Recreation -->
                <div class="dropdown">
                    <button class="btn btn-default dropdown-toggle" type="button" id="menu3" data-toggle="dropdown">
                        <span class="glyphicon glyphicon-tree-conifer"></span>
                        <span class="caret"></span></button>
                    <ul class="dropdown-menu" role="menu" aria-labelledby="menu1">
                        <p>Outdoors and Recreation:</p>
                        <li><a><input value="beach" type="checkbox" name="out_beaches"/>Beaches</a></li>
                        <li><a><input value="trails" type="checkbox" name="out_trails"/>Trails/Hikes</a></li>
                        <li><a><input value="nationalParks" type="checkbox" name="out_parks"/>National Parks</a></li>
                    </ul>
                </div>
                <!-- forth drop down Gas Stations and Service Stations -->
                <div class="dropdown">
                    <button class="btn btn-default dropdown-toggle" type="button" id="menu4" data-toggle="dropdown">
                        <span class="glyphicon glyphicon-scale"></span>
                        <span class="caret"></span></button>
                    <ul class="dropdown-menu" role="menu" aria-labelledby="menu1">
                        <p>Gas and Service Stations</p>
                        <li><a><input value="gas" type="checkbox" name="gas_gas"/>Gas Stations Only</a></li>
                        <li><a><input value="car repair" type="checkbox" name="gas_service"/>Service Stations Only</a></li>

                        <li><a><input  value="gas / car repair" type="checkbox"/>Gas and Service Stations</a></li>

                    </ul>
                </div>
                <!-- fifth drop down food -->
                <div class="dropdown">
                    <button class="btn btn-default dropdown-toggle" type="button" id="menu5" data-toggle="dropdown">
                        <span class="glyphicon glyphicon-cutlery"></span>
                        <span class="caret"></span></button>
                    <ul class="dropdown-menu" role="menu" aria-labelledby="menu1">
                        <p>Food and Drink</p>
                        <li><a><input value="restaurants" type="checkbox" name="food_restaurant"/>Restaurants</a></li>
                        <li><a><input value="diners" type="checkbox" name="food_diners"/>Diners</a></li>
                        <li><a><input value="fast food" type="checkbox" name="food_fastfood"/>Fast Food</a></li>
                        <li><a><input value="health Food + health" type="checkbox" name="food_vegetarian"/>Vegetarian and Health Food</a></li>
                        <li><a><input value="bars" type="checkbox" name="food_bars"/>Bars and Drinks</a></li>
                        <li><a><input value="wineries/Breweries" type="checkbox" name="food_wineries"/>Wineries, Breweries and
                                Distilleries</a></li>
                    </ul>
                </div>
            </div>
            <div class="modal-footer">
                <button id="actionSubmit" type="button" class="btn btn-default" data-dismiss="modal">Show Results
                </button>

            </div>
        </div>
    </div>
</div>

<div id="myModal2" class="modal fade" role="dialog" >
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content" id="modal_content">
            <div class="modal-header" >
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">what would you like for event?</h4>
            </div>
            <div class="modal-body" id="modal_body">
                <form>
                    <div class="input-group">
                        <span class="input-group-addon">City</span>
                        <input id="cityEvent" type="text" class="form-control" name="cityEvent" placeholder="Additional Info">
                    </div>
                    <input type="radio" name="choose" value="Comedy">Comedy<br>
                    <input type="radio" name="choose" value="Concerts and Tour Dates">Concerts and Tour Dates<br>
                    <input type="radio" name="choose" value="Conferences and Trade Shows">Conferences and Trade Shows<br>
                    <input type="radio" name="choose" value="Festivals">Festivals<br>
                    <input type="radio" name="choose" value="Food and Wine">Food and Wine<br>
                    <input type="radio" name="choose" value="Kids and Family">Kids and Family<br>
                    <input type="radio" name="choose" value="Nightlife and Singles">Nightlife and Singles<br>
                    <input type="radio" name="choose" value="Performing Arts">Performing Arts<br>
                    <input type="radio" name="choose" value="Sports">Sports<br>
                </form>
            </div>
            <div class="modal-footer">
                <button id="submit_event"  type="button" class="btn btn-default" data-dismiss="modal" onclick="/*getInformation()*/">Show Results</button>
            </div>
        </div>
    </div>
</div>


</body>
</html>




