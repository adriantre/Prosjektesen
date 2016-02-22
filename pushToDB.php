<?php
	$input = file_get_contents("php://input");

	$conn = pg_connect("host=92.62.34.78 port=5432 dbname=adrianto user=adrianto password=kalende");
	pg_set_error_verbosity($conn, PGSQL_ERRORS_VERBOSE);
	if ($conn === false) {
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
	foreach ($json_object->values as $column)
	{
		$values[$column->column] = $column->data;
	}
	foreach ($json_object->condition as $column)
	{
		$condition[$column->column] = $column->data;
	}
	foreach ($json_object->to_select as $column)
	{
		array_push($to_select, $column->column);
	}
	

    switch ($sqlopt) {
	    case "insert":
	        $result = pg_insert($conn, $table, $data);
	        break;
	    case "update":
	        $result = pg_update($conn, $table, $data, $condition);     
	        break;
	    case "select":
	        $result = pg_query($conn, "select" . http_build_query($data, '', ",") . "from" . $table . "where" . http_build_query($condition, '', "and"));
	        break;
	    case "delete":
	        $result = pg_delete($conn, $table, $condition);
	        break;
    }
?>