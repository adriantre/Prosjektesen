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

	$array = array();

	$sqlopt = $json_object->sqlopt;
	$table = $json_object->table;
	foreach ($json_object->data as $column)
	{
		$array[$column->column] = $column->data;
	}

	$result = pg_insert($conn, $table, $array);
    // switch ($sqlopt) {
    // case 'insert':
    //     $result = pg_insert($conn, $table, $array);
    //     break;
    // case 'update':
    //     $result = pg_update($conn, $table, $array);     
    //     break;
    // case 'delete':
    //     $result = pg_delete($conn, $table, $array);
    //     break;
    // }

?>