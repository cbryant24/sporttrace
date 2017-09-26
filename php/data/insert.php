<?php
// WRITE REGEX CHECKER HERE?
// WRITE REGEX CHECKER HERE?
// WRITE REGEX CHECKER HERE?


if(!isset($_SESSION['fb_access_token'])){
	$output['errors'][] = "Not Logged In";
	print_r($output['errors']);
	die();
};
if($conn == false){
	$output['errors'][] = "Bad Connection";
	print_r($output['errors']);
};

// print_r($_POST);

$query = "INSERT INTO `sportsfinder-db`.`game_table` (`user_id`, `title`, `date`, `time`, `lat`, `lon`, `desc`, `address`, `vibe`) 
VALUES ('{$_SESSION['user_id']}','{$_POST['complete_game']['game_title']}', '{$_POST['complete_game']['game_date']}', '{$_POST['complete_game']['game_time']}', '{$_POST['complete_game']['lat_lon']['lat']}', '{$_POST['complete_game']['lat_lon']['lon']}', '{$_POST['complete_game']['game_description']}', '{$_POST['complete_game']['game_address']}', {$_POST['complete_game']['game_vibe']});

INSERT INTO `sportsfinder-db`.`game_history`(`user_id`, `game_id`) 
VALUES ('{$_SESSION['user_id']}', LAST_INSERT_ID());";



//(SELECT `game_id` FROM `sportsfinder-db`.`game_table` WHERE `user_id`='{$_SESSION['user_id']}'))


$result = mysqli_query($conn, $query);

if($result){
	if (mysqli_affected_rows($conn)){
		$output['success'] = true;
		print_r('Good Shit');

	} else {
		$output['errors'][] = 'Insert Error';
	};
} else {
	$output['errors'][] = 'Database Error';
};
print_r($output['errors']);	
	
?>
