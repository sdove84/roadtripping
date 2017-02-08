<?php
include "db.php";
if(isset($_POST['submit'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $email = $_POST['email'];
    $confirm_password = $_POST['confirm_password'];
    $mpg = $_POST['mpg'];

    if($username ==="" ||$password ==="" || $email ==="" || $mpg===""){
        echo '<script language="javascript">';
        echo 'alert("please enter valid input")';
        echo '</script>';
    }else if(strlen($username) < 4){
        header("location:create_new_account.php?err=". urldecode("The name must be at least 4 characters long"));
        exit();
    }else if ($password != $confirm_password){
        header("location:create_new_account.php?err=". urldecode("Confirm password does NOT match"));
        exit();
    }else if(strlen($password) <6){
        header("location:create_new_account.php?err=". urldecode("Password need to be at least 6 character long"));
        exit();
    }else {
        if(!$connection){
            echo (mysqli_error($connection));
        }else {
            $confirmCode= rand();
            $query = "INSERT INTO `users` VALUES ('','$username','$password','$email','0','$confirmCode','$mpg')";
            $result = mysqli_query($connection,$query);

            $message =
                "
                Confirm your email Click the link below to verify your account 
                http://localhost/backend/email_confirm.php?username=$username&code=$confirmCode;
                ";

           include "php_mailer/mail_handler.php";

            echo ("Please confirm your email address");


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
