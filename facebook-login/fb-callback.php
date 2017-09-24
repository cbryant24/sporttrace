<?php
/*
start your session, load your creds, facebook sdk, and make the facebook object
*/
session_start();//start your session
include('facebook_info.php');//make sure to include your facebook credentials!
include('libraries/php-graph-sdk/src/Facebook/autoload.php');//then you'll need to include the facebook sdk

$fb = new Facebook\Facebook([//create a new facebook object
  'app_id' => FACEBOOK_APP_ID, //Replace {app-id} with your app id
  'app_secret' => FACEBOOK_SECRET,
  'default_graph_version' => FACEBOOK_GRAPH_VERSION,
  ]);

/*check for errors!  maybe make use of a fancy try/catch block!*/
$helper = $fb->getRedirectLoginHelper();

try {
  $accessToken = $helper->getAccessToken();
} catch(Facebook\Exceptions\FacebookResponseException $e) {
  // When Graph returns an error
  echo 'Graph returned an error: ' . $e->getMessage();
  exit;
} catch(Facebook\Exceptions\FacebookSDKException $e) {
  // When validation fails or other local issues
  echo 'Facebook SDK returned an error: ' . $e->getMessage();
  exit;
}

//did we get the access token?  better check!
if (! isset($accessToken)) {
  if ($helper->getError()) {
    header('HTTP/1.0 401 Unauthorized');
    echo "Error: " . $helper->getError() . "\n";
    echo "Error Code: " . $helper->getErrorCode() . "\n";
    echo "Error Reason: " . $helper->getErrorReason() . "\n";
    echo "Error Description: " . $helper->getErrorDescription() . "\n";
  } else {
    header('HTTP/1.0 400 Bad Request');
    echo 'Bad request';
  }
  exit;
}

// we are now officially Logged in
echo '<h3>Access Token</h3>';
var_dump($accessToken->getValue());

// The OAuth 2.0 client handler helps us manage access tokens
$oAuth2Client = $fb->getOAuth2Client(); 

// Get the access token metadata from /debug_token
$tokenMetadata = $oAuth2Client->debugToken($accessToken);
echo '<h3>Metadata</h3>';
var_dump($tokenMetadata);

// Validation (these will throw FacebookSDKException's when they fail)
$tokenMetadata->validateAppId(FACEBOOK_APP_ID); // Replace {app-id} with your app id
// If you know the user ID this access token belongs to, you can validate it here
//$tokenMetadata->validateUserId('123');
$tokenMetadata->validateExpiration();

if (! $accessToken->isLongLived()) {
  // Exchanges a short-lived access token for a long-lived one
  try {
    $accessToken = $oAuth2Client->getLongLivedAccessToken($accessToken); 
  } catch (Facebook\Exceptions\FacebookSDKException $e) {// Validation (these will throw FacebookSDKException's when they fail)
    echo "<p>Error getting long-lived access token: " . $helper->getMessage() . "</p>\n\n";
    exit;
  }

  echo '<h3>Long-lived</h3>';
  var_dump($accessToken->getValue());
}

$_SESSION['fb_access_token'] = (string) $accessToken;


try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get('me?fields=id,name,email', "{$_SESSION['fb_access_token']}");
} catch(Facebook\Exceptions\FacebookResponseException $e) {
  echo 'Graph returned an error: ' . $e->getMessage();
  exit;
} catch(Facebook\Exceptions\FacebookSDKException $e) {
  echo 'Facebook SDK returned an error: ' . $e->getMessage();
  exit;
}

$user = $response->getGraphUser();


  $_SESSION['user_name'] = $user['name'];
  $_SESSION['user_id'] = $user['id'];
  $_SESSION['user_email'] = $user['email'];
// User is logged in with a long-lived access token.
// You can redirect them to a members-only page.
header('Location: http://tittyking.com/sportsfinder/findgame.php');


?>
