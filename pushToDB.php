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
	if (isset($json_object->values)) 
	{
		foreach ($json_object->values as $column)
		{
			$values[$column->column] = $column->data;
		}
	}
	if (isset(($json_object->conditions))
	{
		foreach ($json_object->conditions as $column)
		{
			$conditions[$column->column] = $column->data;
		}
	}
	if (isset($json_object->to_select))
	{
		foreach ($json_object->to_select as $column)
		{
			array_push($to_select, $column->column);
		}
	}

    switch ($sqlopt) {
	    case "insert":
	        $result = pg_insert($conn, $table, $values);
	        break;
	    case "update":
	        $result = pg_update($conn, $table, $values, $condition);     
	        break;
	    case "select":
	        $result = pg_query($conn, "select" . http_build_query($to_select, '', ",") . "from" . $table . "where" . http_build_query($condition, '', "and"));
	        break;
	    case "delete":
	        $result = pg_delete($conn, $table, $condition);
	        break;
    }
?>