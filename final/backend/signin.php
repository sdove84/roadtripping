<?php
include "db.php";
session_start();

//if(!$_SESSION['created_account']){
//    echo '<script language="javascript">';
//    echo 'alert("Welcome Back! plese sign in to continue")';
//    echo '</script>';
//}
//else {
//    echo '<script language="javascript">';
//    echo 'alert("Welcome to RoadTrip. You have successfuly created account with us. Please sign in to continue")';
//    echo '</script>';
//}

if(isset($_POST['submit'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $query = "SELECT * FROM users ";
    $query .= "WHERE username = '$username' and password= '$password' ";
    $result = mysqli_query($connection, $query);
    if (mysqli_num_rows($result) === 1) {
        $_SESSION['auth'] = true;
        header('Location:cung_final.php');
    } else {
        echo '<script language="javascript">';
        echo 'alert("invalid username, password")';
        echo '</script>';
    }
}






?>



<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="../JsFinal.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link type="text/css" rel="stylesheet" href="../styleFinal.css">
    <title>Login Page</title>
</head>
<div class="container">

<div class="text-center">
<span id="home" onclick="openNav()">&#9776</span>
</div>

<div id="mySidenav" class="sidenav">
    <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
    <a href="../homePage.html">Home</a>
    <a href="../create_new_account.html">Create Account</a>
    <a href="../IndexFinal.html">Start Trip</a>
</div>

<div class="text-center">
    <h1>TRIP PLANNER</h1>
    <div class="container">
        <form class="form form-inline" role="form" action="signin.php" method="post">
            <legend>Login</legend>
            <div class="form-group">
                <div class="col-xs-12">
                    <input type="text" class="form-control" name="username" placeholder="Username">
                </div>
                <div class="col-xs-12">
                    <input type="password" class="form-control" name="password" placeholder="Password">
                </div>
                <input type="submit" name="submit" value="submit" class="btn btn-success">
            </div>
        </form>
    </div>
</div>
    </div>
</body>
</html>