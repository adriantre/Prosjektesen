<?php
	error_reporting(E_ALL);
	ini_set('display_errors', 1);
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
	$table = "public." .$json_object->table;
	$conditions_array = array();

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
			array_push($conditions_array, $column->column . " = '" . $column->data . "'");
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
	        pg_insert($conn, $table, $values);
	        $result = pg_query($conn, "select currval('" . $table . "_" . $json_object->table . "_id_seq');");
	        break;
	    case "update":
	        $result = pg_update($conn, $table, $values, $conditions);     
	        break;
	    case "select":
	    	$sql = "select " . implode(", ", $to_select) . " from " . $table . " where " . implode(" and ", $conditions_array) . ";";
	        $result = pg_query($conn, $sql);
	        break;
	    case "delete":
	        $result = pg_delete($conn, $table, $conditions);
	        break;
    }

	if (is_bool($result)) {
		echo $result ? 'true' : 'false';
		exit;
	}
    while ($result_row = pg_fetch_assoc($result)) {
    	echo json_encode($result_row);
    }

?>