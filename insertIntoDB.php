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

	$table = $json_object->table;
	foreach ($json_object->data as $column)
	{
		$array[$column->column] = $column->data;
	}


	echo implode("|",$array);
	pg_insert($conn, $table, $array);

	// if ($sqlopt == "insert")
	// {
	// 	pg_insert($conn, $table, $array);
	// } else if ($sqlopt == "update")
	// {
	// 	pg_update($conn, $table, $array);
	
	// } else if ($sqlopt == "delete")
	// {
	// 	pg_delete($conn, $table, $array);
	// }

?>