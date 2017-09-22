<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>


<?php
session_start();//start your session
include('facebook_info.php');//make sure to include your facebook credentials!
include('libraries/php-graph-sdk');//then you'll need to include the facebook sdk

$fb = new Facebook\Facebook([//create a new facebook object
  'app_id' => FACEBOOK_APP_ID, //Replace {app-id} with your app id
  'app_secret' => FACEBOOK_SECRET,
  'default_graph_version' => FACEBOOK_GRAPH_VERSION,
  ]);

$helper = $fb->getRedirectLoginHelper();//make a redirect helper handler

$permissions = ['email']; //Optional permissions//specify the permissions this app will need, putting them into an array
$loginUrl = $helper->getLoginUrl('http://tittyking.com/sportsfinder/facebook-login/fb-callback.php', $permissions); //generate the login url

echo '<a href="' . htmlspecialchars($loginUrl) . '">Log in with Facebook!</a>';
?>
<!--craft the a link for the user to log into facebook to grant your app authorization-->

</body>
</html>