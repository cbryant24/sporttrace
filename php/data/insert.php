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
// print_r($_SESSION);
$data = json_decode(file_get_contents("php://input"), true);


print_r($data);
die();


$query = "INSERT INTO `sportsfinder-db`.`game_table` (`user_id`, `title`, `date`, `time`, `lat`, `lon`, `desc`, `address`, `vibe`, `ball`, `zip`) 
VALUES ({$_SESSION['user_id']},'{$data['game_title']}', '{$data['game_date']}', '{$data['game_time']}', '{$data['lat_lon']['lat']}', '{$data['lat_lon']['lon']}', '{$data['game_description']}', '{$data['game_address']}', '{$data['game_vibe']}', {$data['ball']}, {$data['zip']})";

// $output['query'] = $query;


// $lastInsertId = LAST_INSERT_ID();
// $query2 = "INSERT INTO `sportsfinder-db`.`game_history`(`user_id`, `game_id`) 
// VALUES ('{$_SESSION['user_id']}', ".$lastInsertId.")";
// $lastInsertId = LAST_INSERT_ID();



$result_game = mysqli_query($conn, $query);
// printf("Last inserted record has id %d\n", mysql_insert_id());
$lastInsertId = mysqli_insert_id($conn);


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

$query2 = "INSERT INTO `sportsfinder-db`.`game_history`(`user_id`, `game_id`) 
VALUES ({$_SESSION['user_id']}, {$lastInsertId})";


$output['query2'] = $query2;

$result_history = mysqli_query($conn, $query2);


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

print_r($output);	
	
?>
