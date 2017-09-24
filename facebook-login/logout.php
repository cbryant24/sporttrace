<?php 
	session_start();

	if(isset($_SESSION['fb_access_token'])){
		$logouturl = 'https://www.facebook.com/logout.php?next='.'http://tittyking.com/sportsfinder/'.'&access_token='.$_SESSION['fb_access_token'];

		unset $_SESSION['fb_access_token'];
		unset $_SESSION['user_name'];
		unset $_SESSION['user_email'];
		unset $_SESSION['user_id'];
		
		session_destroy();
		header('Location: '.$logouturl);

	};
?>