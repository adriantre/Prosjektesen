<?php
	$input = file_get_contents("php://input");

	$conn = pg_connect("host=92.62.34.78 port=5432 dbname=adrianto user=adrianto password=kalende");
	pg_set_error_verbosity($conn, PGSQL_ERRORS_VERBOSE);
	
	if ($conn === false) {
		echo "An error occurred.\n";
		var_dump(pg_last_error($conn));
	exit;
}
 
  $json_object = json_encode($input);
 
  $array = array();
 
  $table = $json_object->table;
  foreach ($json_object->data as $column)
  {
    $array[$column->column] = $column->data;
  }
 
  pg_insert($conn, $table, $array);
  pg_query($conn, "select * from public.user;");
?>