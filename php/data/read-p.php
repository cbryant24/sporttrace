<?php

$query = "SELECT 
`game_table`.`title`, `game_table`.`date`, `game_table`.`time`, `game_table`.`lat`, `game_table`.`lon`, `game_table`.`desc`,`game_table`.`address`,`game_table`.`vibe`,`game_table`.`game_id`
FROM `game_table`
INNER JOIN `game_history`
ON `game_table`.`game_id`=`game_history`.`game_id`
WHERE `game_history`.`user_id` = 10214489178802973 ";


// print_r($query);



$result = mysqli_query($conn, $query);  // send the query to the database, store the result of the query into $result



$output = [
	'success' => false
];

if(empty($result)){
	$output['errors'][] = 'Database Error';
} else {
	if (mysqli_num_rows($result)){ 
		$output['success'] = true;
		$output['data']=[];
		
		while( $row = mysqli_fetch_assoc($result) ){
			$output['data'][] = $row;
		}
		print_r(json_encode($output['data']));

	} else {
		$output['errors'][] = 'No Data';
	}
}
			





// $query2 = "SELECT 
// `game_table`.`title`, 
// `game_table`.`date`, 
// `game_table`.`time`, 
// `game_table`.`lat`, 
// `game_table`.`lon`, 
// `game_table`.`desc`,
// `game_table`.`address`,
// `game_table`.`vibe`,

// FROM game_table
// INNER JOIN game_history
// ON `game_table`.`game_id`=`history_table`.`game_id`";

?>



