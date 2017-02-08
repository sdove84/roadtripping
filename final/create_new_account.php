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
    <div class="row vertical-offset-100">
        <div class="col-md-4 col-md-offset-4">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h3 class="panel-title">Please create your account</h3>
                </div>
                <?php if(isset($_GET['err'])) { ?>
                    <div class="alert alert-danger"><?php echo $_GET['err'] ?></div>
                <?php } ?>
                <div class="panel-body">
                    <form accept-charset="UTF-8" role="form" method="Post">
                        <fieldset>
                            <div class="form-group">
                                <input class="form-control" name="username" placeholder="Username at least 4 character" type="text" required >
                            </div>
                            <div class="form-group">
                                <input class="form-control" name="password" placeholder="Password at least 4 character" type="password" required>
                            </div>
                            <div class="form-group">
                                <input class="form-control" name="confirm_password" placeholder="Confirm Password" type="password" required>
                            </div>
                            <div class="form-group">
                                <input class="form-control"  name="mpg" placeholder="MPG" type="number" required>
                            </div>
                            <div class="form-group">
                                <input class="form-control" name="email" placeholder="Email address" type="email" required>
                            </div>

                            <input class="btn btn-lg btn-info btn-block" type="submit" name="submit" value="Create Account">
                        </fieldset>
                    </form>
                    <div class="createAccountCancel">
                        <p>Already have an account?<a href="signin.php"> Sign in</a><p>
                    </div>
                    <hr>
                    <div class="createAccountCancel">
                        <a href="homePage.html">Cancel</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>