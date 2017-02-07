<?php
include "db.php";
session_start();
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
$rootDir = '../';
?>

<?php include "../signin.php" ?>
