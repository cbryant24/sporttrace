<?php  
  print_r($_SESSION);
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

  print_r('Name: ' . $user['name']);
  print_r('ID: ' . $user['id']);
  print_r('Email: ' . $user['email']);


?>