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
            echo $username;
            echo $password;
            echo $email;
            echo $mpg;
            $query .= "VALUES('$username','$password','$email','$mpg')";
            $result = mysqli_query($connection,$query);
            if(!$result){
                echo(mysqli_error($result));
            }else {
                session_start();
                $_SESSION['auth'] = true;
                header('Location:cung_final.php');
                echo ('successfully query');
            }
        }
    }
}
$rootDir = '../';
?>
<?php include"../create_new_account.php" ?>
