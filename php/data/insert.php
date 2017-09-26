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
}
print_r($_POST);

die();

$query = "INSERT INTO `sportsfinder-db`.`game_table` (`user_id`, `title`, `date`, `time`, `lat`, `lon`, `desc`, `address`, `vibe`) 
VALUES ('{$_SESSION['user_id']}','{$_POST['game_title']}', '{$_POST['game_date']}', '{$_POST['game_time']}', '{$_POST['lat_lon']['lat']}', '{$_POST['lat_lon']['lon']}', '{$_POST['game_description']}', '{$_POST['game_address']}', {$_POST['game_vibe']}) 

INSERT INTO `sportsfinder-db`.`game_history`(`user_id`, `game_id`) 
VALUES ('{$_SESSION['user_id']}	', LAST_INSERT_ID())";



//(SELECT `game_id` FROM `sportsfinder-db`.`game_table` WHERE `user_id`='{$_SESSION['user_id']}'))


$result = mysqli_query($conn, $query);

if($result){
	if (mysqli_affected_rows($conn)){
		$output['success'] = true;
		print_r($output['success']);

	} else {
		$output['errors'][] = 'Insert Error';
	};
} else {
	$output['errors'][] = 'Database Error';
}
	
	
?>