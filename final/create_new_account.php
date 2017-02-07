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
                <div class="panel-body">
                    <form accept-charset="UTF-8" role="form" method="Post">
                        <fieldset>
                            <div class="form-group">
                                <input class="form-control" placeholder="User Name" name="username" type="text">
                            </div>
                            <div class="form-group">
                                <input class="form-control" placeholder="Password" name="password" type="password">
                            </div>
                            <div class="form-group">
                                <input class="form-control" placeholder="Email" name="email" type="email">
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

<!--    <div class="container">-->
<!--        <form class="form form-inline" role="form" action="create_new_account.php" method="post">-->
<!--            <h4>Create New Account</h4>-->
<!--            <div class="form-group">-->
<!--                <div class="col-xs-6">-->
<!--                    <input type="text" class="form-control" name="username" placeholder="Username">-->
<!--                </div>-->
<!--                <div class="col-xs-6">-->
<!--                    <input type="password" class="form-control" name="password" placeholder="Password">-->
<!--                </div>-->
<!--                <div class="col-xs-6">-->
<!--                    <input type="text" class="form-control" name="email" placeholder="Email">-->
<!--                </div>-->
<!--                <div class="col-xs-6">-->
<!--                    <input type="number" class="form-control" name="mpg" placeholder="MPG">-->
<!--                </div>-->
<!--                <input type="submit" name ="submit" class="btn btn-success">-->
<!--            </div>-->
<!--        </form>-->
<!--    </div>-->
</div>
</body>
</html>