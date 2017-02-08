<?php
require("db.php");
session_start();

//email active start
if(isset($_GET['username']) || isset($_GET['code'])){
    $username = $_GET['username'];
    $code = $_GET['code'];

    $query = "SELECT * FROM users ";
    $query .= "WHERE username = '$username'";
    $result = mysqli_query($connection,$query);
    while ($row = mysqli_fetch_assoc($result)){
        $db_code = $row['confirm_code'];
        $confirmed = $row['confirmed'];
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
        }else{
            header("location:signin.php?err=". urldecode("Thank you, your account now has been activated. Please log in to continue"));
            exit();
        }
    }else{
        header("location:signin.php?err=". urldecode("NOT FOUND"));
        exit();
    }
}
//email activate end


//login start

if(isset($_POST['submit'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $query = "SELECT * FROM users ";
    $query .= "WHERE username = '$username' and password= '$password' ";
    $result = mysqli_query($connection, $query);
    if (mysqli_num_rows($result) === 1) {
        $row = mysqli_fetch_assoc($result);
        if($row['confirmed'] == '1'){
            $_SESSION['auth'] = true;
            header('Location:cung_final.php');
        }else {
            header("location:signin.php?err=". urldecode("Please activate your account before log in"));
            exit();
        }
    } else {
        echo '<script language="javascript">';
        echo 'alert("invalid username, password")';
        echo '</script>';
    }
}
$rootDir = '../';
?>

<!--login end-->

<!--html-->
<?php include "../signin.php" ?>
