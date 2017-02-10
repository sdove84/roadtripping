<?php
include "db.php";
if(isset($_POST['submit'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $email = $_POST['email'];
    $confirm_password = $_POST['confirm_password'];
    $mpg = $_POST['mpg'];

        define('name','$username');
    function is_unique_email(){
        global $email;
        global $connection;
        $query = "SELECT * FROM `users` WHERE email = '$email'";

        $result = mysqli_query($connection,$query);
        if(mysqli_num_rows($result) > 0){
            return false;
        }else{
            return true;
        }
    }
    function is_unique_username(){
        global $username;
        global $connection;
        $query = "SELECT * FROM `users` WHERE username = '$username'";

        $result = mysqli_query($connection,$query);
        if(mysqli_num_rows($result) > 0){
            return false;
        }else{
            return true;
        }
    }
    if(strlen($username) <4){
        header("location:create_new_account.php?err=". urldecode("The name must be at least 4 characters long"));
        exit();
    }else if ($password != $confirm_password){
        header("location:create_new_account.php?err=". urldecode("Confirm password does NOT match"));
        exit();
    }else if(strlen($password) <4){
        header("location:create_new_account.php?err=". urldecode("Password need to be at least 4 character long"));
        exit();
    }else if(!is_unique_email($email)){
        header("location:create_new_account.php?err=". urldecode("Email already existed"));
        exit();
    }else if(!is_unique_username($username)){
        header("location:create_new_account.php?err=". urldecode("Username already taken"));
        exit();
    }else {
        if(!$connection){
            echo (mysqli_error($connection));
        }else {
            $confirmCode= rand();
            $username = mysqli_real_escape_string($connection,$username);
            $password = mysqli_real_escape_string($connection,$password);
            $email = mysqli_real_escape_string($connection,$email);
            $confirmCode = mysqli_real_escape_string($connection,$confirmCode);
            $mpg = mysqli_real_escape_string($connection,$mpg);


            //    password encryption
//            $hash_format = "$2y$10$";
//            $salt = "iusesomecrazystrings22";//22character
//
//            $hash_and_salt = $hash_format.$salt;
//            $password = crypt($password,$hash_and_salt);

//    password encryption end


            $query = "INSERT INTO `users` VALUES ('','$username','$password','$email','0','$confirmCode','$mpg')";
            $result = mysqli_query($connection,$query);
            $message =
                "
                Confirm your email 
                Click the link below to verify your account 
                http://localhost/final/backend/email_confirm.php?username=$username&code=$confirmCode;
                ";

           include "php_mailer/mail_handler.php";

            echo '<script language="javascript">';
            echo 'alert("Please verify your email")';
            echo '</script>';

            if(!$result){
                echo(mysqli_error($result));
//            }else {
//                session_start();
//                $_SESSION['auth'] = true;
//                header('Location:cung_final.php');
//                echo ('successfully query');
            }
        }
    }
}

$rootDir = '../';
?>
<?php include"../create_new_account.php" ?>
