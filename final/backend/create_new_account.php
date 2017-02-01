<?php
include "db.php";
if(isset($_POST['submit'])) {

    $username = $_POST['username'];
    $password = $_POST['password'];
    $email = $_POST['email'];
    $mpg = $_POST['mpg'];

    if($username ==="" ||$password ==="" || $email ==="" || $mpg===""){
        echo '<script language="javascript">';
        echo 'alert("please enter valid input")';
        echo '</script>';
    }else {
        if(!$connection){
            echo (mysqli_error($connection));
        }else {
            $query = "INSERT INTO users (username,password,email,mpg) ";
            $query .= "VALUES('$username','$password','$email','$mpg')";
            $result = mysqli_query($connection,$query);
            if(!$result){
                echo(mysqli_error($result));
            }else {
                //if query successfuly
                session_start();
                $_SESSION['created_account']=true;
                header('Location: signin.php');
                echo ('successfully query');
            }
        }
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
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link type="text/css" rel="stylesheet" href="../styleFinal.css">
    <title>Create New Account</title>
</head>
<body class="container">
<div class="text-center">
    <h1>TRIP PLANNER</h1>
    <div class="container">
        <form class="form form-inline" role="form" action="create_new_account.php" method="post">
            <legend>Create New Account</legend>
            <div class="form-group">
                <div class="col-xs-6">
                    <input type="text" class="form-control" name="username" placeholder="Username">
                </div>
                <div class="col-xs-6">
                    <input type="password" class="form-control" name="password" placeholder="Password">
                </div>
                <div class="col-xs-6">
                    <input type="text" class="form-control" name="email" placeholder="Email">
                </div>
                <div class="col-xs-6">
                    <input type="number" class="form-control" name="mpg" placeholder="MPG">
                </div>
                <input type="submit" name ="submit" class="btn btn-success">
            </div>
        </form>
    </div>
</div>
</body>
</html>