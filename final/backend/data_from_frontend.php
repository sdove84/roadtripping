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


if(isset($_POST['places']))
    $places =$_POST['places'];
    $acc_hotels = $places['acc_hotels'];
    $acc_motels = $places['acc_motels'];
    $acc_camping = $places['acc_camping'];
    $att_amusement = $places['att_amusement'];
    $att_museums = $places['att_museums'];
    $att_zoo = $places['att_zoo'];
    $out_beaches = $places['out_beaches'];
    $out_trails = $places['out_trails'];
    $out_parks = $places['out_parks'];
    $gas_gas = $places['gas_gas'];
    $gas_service = $places['gas_service'];
    $food_restaurant = $places['food_restaurant'];
    $food_diners = $places['food_diners'];
    $food_fastfood = $places['food_fastfood'];
    $food_vegetarian = $places['food_vegetarian'];
    $food_bars = $places['food_bars'];
    $food_wineries = $places['food_wineries'];

//    print_r($places);

//    $query = "UPDATE `original_destination` SET ";
//    $query .= "`acc_hotels`='$acc_hotels' ";
//    $query .= "`acc_motels`='$acc_motels' ";
//    $query .= "`acc_camping`='$acc_camping' ";
//    $query .= "`att_amusement`='$att_amusement' ";
//    $query .= "`att_museums`='$att_museums' ";
//    $query .= "`att_zoo`='$att_zoo' ";
//    $query .= "`out_beaches`='$out_beaches' ";
//    $query .= "`out_trails`='$out_trails' ";
//    $query .= "`out_parks`='$out_parks' ";
//    $query .= "`gas_gas`='$gas_gas' ";
//    $query .= "`gas_service`='$gas_service' ";
//    $query .= "`food_restaurant`='$food_restaurant' ";
//    $query .= "`food_diners`='$food_diners' ";
//    $query .= "`food_fastfood`='$food_fastfood' ";
//    $query .= "`food_vegetarian`='$food_vegetarian' ";
//    $query .= "`food_bars`='$food_bars' ";
//    $query .= "`food_wineries`='$food_wineries' ";

foreach($places AS $key=>$value){
    echo $key." ".$value;

    echo "\n";

    if($value == "true"){
        echo $key;
        echo "\n";
        $query = "UPDATE original_destination SET $key = '1'";
        $result = mysqli_query($connection,$query);
    }
}


//$query = "UPDATE original_destination SET ";
//$query .= "acc_hotels = '4', ";
//$query .= "acc_motels = '4' ";
////$query .= "WHERE id = $id ";
//$result = mysqli_query($connection,$query);
?>