<?php
	header("Content-type: application/json");
	$input = file_get_contents("php://input");

	$conn = pg_connect("host=92.62.34.78 port=5432 dbname=adrianto user=adrianto password=kalende");
	pg_set_error_verbosity($conn, PGSQL_ERRORS_VERBOSE);
	if ($conn === false)
	{
		echo "An error occurred connecting to the database.\n";
		var_dump(pg_last_error($conn));
		exit;
	}
	$json_object = json_decode($input);

	$values = array();
	$conditions = array();
	$to_select = array();
	$sqlopt = $json_object->sqlopt;
	$table = $json_object->table;

	if (array_key_exists('values', $json_object)) 
	{
		foreach ($json_object->values as $column)
		{
			$values[$column->column] = $column->data;
		}
	}
	if (array_key_exists('conditions', $json_object))
	{
		foreach ($json_object->conditions as $column)
		{
			$conditions[$column->column] = $column->data;
		}
	}
	if (array_key_exists('to_select', $json_object))
	{
		foreach ($json_object->to_select as $column)
		{
			array_push($to_select, $column->column);
		}
	}

    switch ($sqlopt) {
	    case "insert":
	        $result = pg_insert($conn, $table, $values);
	        $last_id_result = pg_query($conn, "select currval('" . $table . "_id_seq');");
	        break;
	    case "update":
	        $result = pg_update($conn, $table, $values, $condition);     
	        break;
	    case "select":
	        $result = pg_query($conn, "select " . http_build_query($to_select, '', ",") . " from " . $table . " where " . http_build_query($condition, '', " and " . ";"));
	        break;
	    case "delete":
	        $result = pg_delete($conn, $table, $condition);
	        break;
    }


    $last_id = pg_fetch_row($last_id_result);
	echo json_encode($last_id);
	// if (is_bool($result)) {
		// echo $result ? 'true' : 'false';
	// }
	// 	else {
	// 	$result_array = pg_fetch_all($result);
	// 	echo json_encode($result_array);	
	// }

?>