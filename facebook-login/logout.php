<?php 
	$token = $facebook->getAccessToken();
	$url = 'https://www.facebook.com/logout.php?next=' . 'http://tittyking.com/sportsfinder/' .
	  '&access_token='.$token;

	if(isset($_SESSION['user_name'])){
		unset $_SESSION['user_name'];
		unset $_SESSION['user_email']
		unset $_SESSION['user_id']
	};

	session_destroy();
	header('Location: '.$url);
?>