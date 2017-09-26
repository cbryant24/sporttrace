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

// $lastInsertId = mysql_insert_id();
// print_r($_POST);


$query = "INSERT INTO `sportsfinder-db`.`game_table` (`user_id`, `title`, `date`, `time`, `lat`, `lon`, `desc`, `address`, `vibe`) 
VALUES ('{$_SESSION['user_id']}','{$_POST['complete_game']['game_title']}', '{$_POST['complete_game']['game_date']}', '{$_POST['complete_game']['game_time']}', '{$_POST['complete_game']['lat_lon']['lat']}', '{$_POST['complete_game']['lat_lon']['lon']}', '{$_POST['complete_game']['game_description']}', '{$_POST['complete_game']['game_address']}', {$_POST['complete_game']['game_vibe']})";

$lastInsertId = LAST_INSERT_ID();

$query2 = "INSERT INTO `sportsfinder-db`.`game_history`(`user_id`, `game_id`) 
VALUES ('{$_SESSION['user_id']}', ".$lastInsertId.")";




$result_game = mysqli_query($conn, $query);
$result_history = mysqli_query($conn, $query2);

if($result_game){
	if (mysqli_affected_rows($conn)){
		$output['success'] = true;
		print_r('Game Info Added');

	} else {
		$output['errors'][] = 'Game Insert Error';
	};
} else {
	$output['errors'][] = 'Game Table Error';
};

if($result_history){
	if (mysqli_affected_rows($conn)){
		$output['success'] = true;
		print_r('History Info Added');

	} else {
		$output['errors'][] = 'History Insert Error';
	};
} else {
	$output['errors'][] = 'History Table Error';
};




print_r($output['errors']);	
	
?>
