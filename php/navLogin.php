<?php
  session_start();//start your session
  include('../facebook-login/facebook_info.php');//make sure to include your facebook credentials!
  include('../facebook-login/libraries/php-graph-sdk/src/Facebook/autoload.php');//then you'll need to include the facebook sdk


  $fb = new Facebook\Facebook([//create a new facebook object
    'app_id' => FACEBOOK_APP_ID, //Replace {app-id} with your app id
    'app_secret' => FACEBOOK_SECRET,
    'default_graph_version' => FACEBOOK_GRAPH_VERSION,
    ]);

  $helper = $fb->getRedirectLoginHelper();//make a redirect helper handler

  $permissions = ['email'];
  $loginUrl = $helper->getLoginUrl('/facebook-login/fb-callback.php', $permissions); //generate the login url

  if(isset($_SESSION['fb_access_token'])){ 
    $output['status'] = true;
    $output['data'] = '<a class="nav-link" href="facebook-login/logout.php">Logout</a>';   
  } else {
    $output['status'] = false;
    $output['data'] = '<a class="nav-link" href="' . htmlspecialchars($loginUrl) . '">Log in with Facebook!</a>';  
  }


  print(json_encode($output));





?>