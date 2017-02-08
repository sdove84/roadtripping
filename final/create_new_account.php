<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<!--    <script src="JsFinal.js"></script>-->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link type="text/css" rel="stylesheet" href="<?= ($rootDir) ? $rootDir : './' ?>styleFinal.css">
    <title>Create New Account</title>
</head>
<body class="container">
<div class="text-center">
    <h1>TRIP PLANNER</h1>
    <legend></legend>
    <div class="container">
        <form class="form form-inline" role="form" action="create_new_account.php" method="post">
            <h1>Create New Account</h1>

            <?php if(isset($_GET['err'])) { ?>
            <div class="alert alert-danger"><?php echo $_GET['err'] ?></div>
            <?php } ?>
            <div class="form-group">
                <div class="col-xs-6">
                    <input type="text" class="form-control" name="username" placeholder="Username 4 character" required>
                </div>
                <div class="col-xs-6">
                    <input type="password" class="form-control" name="password" placeholder="Password 4 character" required>
                </div>
                <div class="col-xs-6">
                    <input type="password" class="form-control" name="confirm_password" placeholder="Confirm Password" required>
                </div>
                <div class="col-xs-6">
                    <input type="email" class="form-control" name="email" placeholder="Email" required>
                </div>
                <div class="col-xs-6">
                    <input type="number" class="form-control" name="mpg" placeholder="MPG" required>
                </div>
                <input type="submit" name ="submit" class="btn btn-success" value="Create Account">
            </div>
        </form>
    </div>
</div>
</body>
</html>