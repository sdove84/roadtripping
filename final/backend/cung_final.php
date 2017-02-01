<?php
session_start();

if(isset($_SESSION['auth'])){
//    echo '<script language="javascript">';
//    echo 'alert("successfully logged in")';
//    echo '</script>';
}else {
    header('loaction:signin.php');
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>RoadTripping</title>

    <meta name="google-signin-scope" content="profile email">
    <meta name="google-signin-client_id" content="30315203349-jd80sfb669777fd6d1dfterfccd6c8bq.apps.googleusercontent.com">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../styleFinal.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="https://apis.google.com/js/platform.js" async defer></script>
    <script src="../JsFinal.js"></script>
    <!--<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAa6vv25gpTgNJQS3QV--o-FlHkUj9fr20&libraries=places"></script>-->
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBLGhFk5m-1IGHOHb02jvRBSJIZZfrlDic&libraries=places&callback=initMap"
            async defer></script>

</head>
<body>
<div id="mapPageMenuContainer">
    <span id="home2" style="font-size:30px;cursor:pointer" onclick="openNav2()">&#9776; Menu</span>
</div>

<input id="origin-input" class="controls" type="text"
       placeholder="Enter a location">
<input id="destination-input" class="controls" type="text"
       placeholder="Enter a destination ">

<div id="mode-selector" class="controls">
    <input name="type" id="changemode-driving">
    <label for="changemode-driving"></label>
</div>

<div id="mySidenav2" class="sidenav2">
    <a href="javascript:void(0)" class="closebtn" onclick="closeNav2()">&times;</a>
    <button  id= displayData type="button" data-toggle="modal" data-target="#myModal">What would you like to see?</button>
    <button id="more">More Data</button>
    <a href="../create_new_account.html">Create Account</a>
    <a href="signin.php">Sign In</a>
    <a href="">My Account</a>
    <a href="../weathertest.html">Weather</a>
    <a href="../check_list.html">Pack/Shop List</a>

</div>


<span id="getDirectionsButton" onclick="openNav3()">Show Directions</span>

<div id="mySidenav3" class="sidenav3">
    <a href="javascript:void(0)" class="closebtn" onclick="closeNav3()">&times;</a>
    <label id="directionsLabel"><input type="checkbox" id="traffic" onclick="showTraffic()" />Show/Hide Traffic</label>
    <div id="right-panel"></div>
</div>

<div id="map"></div>

<div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;                    </button>
                <h4 class="modal-title">Please select what data you would like to be displayed on your route</h4>
            </div>
            <div class="modal-body">
                <!-- first drop down -- Accommodations -->
                <div class="dropdown">
                    <button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown"><span class="glyphicon glyphicon-bed"></span>
                        <span class="caret"></span></button>
                    <ul class="dropdown-menu" role="menu" aria-labelledby="menu1">
                        <p>Accommodations:</p>
                        <li><a><input value="hotels" type="checkbox"/>Hotels</a></li>
                        <li><a><input value="motel + lodging" type="checkbox"/>Motels</a></li>
                        <li><a><input value="campground + rv_park" type="checkbox"/>Camping/RV Parks</a></li>
                        <li><a><input value="bedBreakfast" type="checkbox"/>Bed and Breakfast</a></li>
                    </ul>
                </div>
                <! --- second drop down Attractions -->
                <div class="dropdown">
                    <button class="btn btn-default dropdown-toggle" type="button" id="menu2" data-toggle="dropdown"> <span class="glyphicon glyphicon-camera"></span>
                        <span class="caret"></span></button>
                    <ul class="dropdown-menu" role="menu" aria-labelledby="menu1">
                        <p>Attractions</p>
                        <li><a><input value="amusement_park" type="checkbox"/>Amusement Parks</a></li>
                        <li><a><input value="museums" type="checkbox"/>Museums</a></li>
                        <li><a><input value="tours" type="checkbox"/>Tours/Excursions</a></li>
                        <li><a><input  value="zoo + aquarium" type="checkbox"/>Zoo/Aquarium</a></li>
                    </ul>
                </div>
                <!-- Third drop down Outdoors and Recreation -->
                <div class="dropdown">
                    <button class="btn btn-default dropdown-toggle" type="button" id="menu3" data-toggle="dropdown"><span class="glyphicon glyphicon-tree-conifer"></span>
                        <span class="caret"></span></button>
                    <ul class="dropdown-menu" role="menu" aria-labelledby="menu1">
                        <p>Outdoors and Recreation:</p>
                        <li><a><input value="beach" type="checkbox"/>Beaches</a></li>
                        <li><a><input value="trails" type="checkbox"/>Trails/Hikes</a></li>
                        <li><a><input value="nationalParks" type="checkbox"/>National Parks</a></li>
                    </ul>
                </div>
                <!-- forth drop down Gas Stations and Service Stations -->
                <div class="dropdown">
                    <button class="btn btn-default dropdown-toggle" type="button" id="menu4" data-toggle="dropdown"><span class="glyphicon glyphicon-scale"></span>
                        <span class="caret"></span></button>
                    <ul class="dropdown-menu" role="menu" aria-labelledby="menu1">
                        <p>Gas and Service Stations</p>
                        <li><a><input value="gas" type="checkbox"/>Gas Stations Only</a></li>
                        <li><a><input value="car repair" type="checkbox"/>Service Stations Only</a></li>
                        <li><a><input  value="gas_station/car repair" type="checkbox"/>Gas and Service Stations</a></li>
                    </ul>
                </div>
                <!-- fifth drop down food -->
                <div class="dropdown">
                    <button class="btn btn-default dropdown-toggle" type="button" id="menu5" data-toggle="dropdown"><span class="glyphicon glyphicon-cutlery"></span>
                        <span class="caret"></span></button>
                    <ul class="dropdown-menu" role="menu" aria-labelledby="menu1">
                        <p>Food and Drink</p>
                        <li><a><input value="restaurants" type="checkbox"/>Restaurants</a></li>
                        <li><a><input value="diners" type="checkbox"/>Diners</a></li>
                        <li><a><input value="fast food" type="checkbox"/>Fast Food</a></li>
                        <li><a><input value="health Food + health" type="checkbox"/>Vegetarian and Health Food</a></li>
                        <li><a><input value="bars" type="checkbox"/>Bars and Drinks</a></li>
                        <li><a><input value="wineries/Breweries" type="checkbox"/>Wineries, Breweries and Distilleries</a></li>
                    </ul>
                </div>
            </div>
            <div class="modal-footer">
                <button id="actionSubmit" type="button" class="btn btn-default" data-dismiss="modal">Show Results</button>
            </div>
        </div>
    </div>
</div>




</body>
</html>



