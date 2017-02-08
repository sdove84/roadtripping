<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<?php
require("db.php");
$username = $_GET['username'];
$code = $_GET['code'];

$query = "SELECT * FROM users ";
$query .= "WHERE username = '$username'";
$result = mysqli_query($connection,$query);
while ($row = mysqli_fetch_assoc($result)){
    $db_code = $row['confirm_code'];
}
if($code == $db_code){
//    $query_confirmed = "UPDATE `users` SET `confirmed`='1'";
//    $query_confirm_code = "UPDATE `users` SET `confirm_code`='0'";
//   $result_confirmed = mysqli_query($connection,$query_confirmed);
//   $result_confirm_code = mysqli_query($connection,$query_confirm_code);
    $query = "UPDATE users SET confirmed='1', confirm_code='0'WHERE username='$username'";
    $result = mysqli_query($connection, $query);

    if(!$result){
        die('no query'.mysqli_error($result));
    }
    echo "thank you. you may now login";
}else{
    echo "wrong code";
}

?>
</body>
</html>