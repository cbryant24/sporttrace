<?php
session_start();
ob_start();
define('fromData',true);
require_once('mysql_connect.php');

if(empty($_GET['action'])){
	exit('no action specified');
}

$output = [
	'success'=> false, //we assume we will fail
	'errors'=>[]
];
switch($_GET['action']){
	case 'read':
		include('data/read.php');
		break;
	case 'read-p':
		include('data/read-p.php');
		break;
	case 'insert':
		include('data/insert.php');
		break;
	case 'join':
		include('data/join.php');
		break;
	// case 'delete':
		//include the php file delete.php
		// include('DataAPI/delete.php');
		// break;
	// case 'update':
		//include the update.php file
		// include('DataAPI/update.php');
		// break;
	default:
		print_r('No Action');
}



//convert the $output variable to json, store the result in $outputJSON
$output['debug'] = ob_get_contents();
ob_end_clean();
$outputJSON = json_encode($output);
print($outputJSON);
//end
//mysql_close($conn) WHY DONT WERK!?
?>