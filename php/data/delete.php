<?php
$query = "DELETE FROM `student_data` WHERE `id`='{$_POST['student_id']}'";//write a query that deletes the student by the given student ID  

if($_POST['student_id']){//check if you have all the data you need from the client-side call. 
	$result = mysqli_query($conn, $query);//send the query to the database, store the result of the query into $result
	if($result){//check if $result is empty. 
		if(mysqli_affected_rows($conn)){//check if the number of affected rows is 1
			$output['success'] = true;//if it did, change output success to true
		} else {
			print_r(mysqli_affected_rows($conn));
			$output['errors'][] = 'Delete Error';
		}
	}else{
		$output['errors'][] = 'Database Error';//if it is, add 'database error' to errors	
	}

} else {
	$output['errors'][] = 'No ID Found';//if not, add an appropriate error to errors

}

 
?>