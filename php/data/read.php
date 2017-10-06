<?php
$data = json_decode(file_get_contents("php://input"), true);

$query = "SELECT 
`game_table`.`title`, `game_table`.`date`, `game_table`.`time`, `game_table`.`lat`, `game_table`.`lon`, `game_table`.`desc`,`game_table`.`address`,`game_table`.`vibe`,`game_table`.`game_id`,`game_table`.`ball`

FROM `sportsfinder-db`.`game_table`
WHERE `game_table`.`zip`= {$data['zip']}";


ob_end_flush();

$result = mysqli_query($conn, $query);  // send the query to the database, store the result of the query into $result
if(empty($result)){
        $output['errors'][] = mysqli_error($conn);
}

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

        } else {
                $output['errors'][] = 'No Data';
        }
 }

?>                                 