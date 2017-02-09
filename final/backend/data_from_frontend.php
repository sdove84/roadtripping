<?php
require("db.php");

if(!empty($_POST['destination'])){
    $origin = $_POST['origin'];
    $destination = $_POST['destination'];

    $query = "INSERT INTO `original_destination`(`origin`,`destination`)";
    $query .= "VALUES('$origin','$destination')";
    $result = mysqli_query($connection,$query);
    if(!connection){
        die('no connection'.mysqli_error($connection));
    }else {
        if(!result){
            die('no query'.mysqli_error($result));
        }else{
            echo ('QUERY SUCCESSFUL');
        }
    }
}

?>