<?php




$query = " SELECT * FROM `game_history`
WHERE `user_id`={$_POST['user_id']} ";

print_r($query);

die();







$result = mysqli_query($conn, $query); //send the query to the database, store the result of the query into $result
$output = [
	'success' => false
];

if(empty($result)){ //check if $result is empty. 
	$output['errors'][] = 'Database Error';

} else {
	if (mysqli_num_rows($result)){ //check if any data came back
		$output['success'] = true; //if it did, change output success to true
		$output['data']=[];
		
		while( $row = mysqli_fetch_assoc($result) ){//do a while loop to collect all the data 
			$output['data'][] = $row;//add each row of data to the $output['data'] array

		}
		print_r(json_encode($output['data']));
		// print_r(mysqli_fetch_assoc($result));

	} else {
		$output['errors'][] = 'No Data';//if not, add to the errors: 'no data'

	}
}
			
	
?>