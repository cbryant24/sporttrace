<?php


// WRITE REGEX CHECKER HERE
// WRITE REGEX CHECKER HERE
// WRITE REGEX CHECKER HERE


$query = "INSERT INTO `sportsfinder-db`.`game_table` (`user_id`, `title`, `date`, `time`, `lat`, `long`, `desc`, `address`) VALUES ('123', '4v4 Game', '2017-09-12', '23:00:00', '14.657997', '14.657997', 'lorem lorem lorem lorem lorem lorem lorem lorem', '432 Learningfuze Ave. Irvine, CA')";

// VALUES ('$_SESSION[facebook_id]','$_POST[title]', '$_POST[date]', '$_POST[time]', '$_POST[lat]', '$_POST[long]', '$_POST[desc]', '$_POST[address]')


$result = mysqli_query($conn, $query);
// print_r($result);
if($result){
	if (mysqli_affected_rows($conn)){
		$output['success'] = true;

	} else {
		$output['errors'][] = 'Insert Error';
	};
} else {
	$output['errors'][] = 'Database Error';
}
print_r($output);

		
	
?>