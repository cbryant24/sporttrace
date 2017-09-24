<?php

  $fb = new Facebook\Facebook([//create a new facebook object
    'app_id' => FACEBOOK_APP_ID, //Replace {app-id} with your app id
    'app_secret' => FACEBOOK_SECRET,
    'default_graph_version' => FACEBOOK_GRAPH_VERSION,
    ]);

  $helper = $fb->getRedirectLoginHelper();//make a redirect helper handler

  $permissions = ['email'];
  $loginUrl = $helper->getLoginUrl('http://tittyking.com/sportsfinder/facebook-login/fb-callback.php', $permissions); //generate the login url

  echo '<a class="nav-link" href="' . htmlspecialchars($loginUrl) . '">Log in with Facebook!</a>';
  
?>