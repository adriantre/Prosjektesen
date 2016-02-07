<?php
// Kalles med:
// xmlhttp.open("POST","http://folk.ntnu.no/adrianto/insertIntoDB.php?table=" + gjeldende tabell + "&newValues=" + verdier som skal settes inn,true);
$table = filter_input(INPUT_GET, "table");
$newValues = filter_input(INPUT_GET, "newValues");
echo $posX.",".$posY;


$conn = pg_connect("host=92.62.34.78 port=5432 dbname=adrianto user=adrianto password=kalende");
pg_set_error_verbosity($conn, PGSQL_ERRORS_VERBOSE);
if ($conn === false) {
  echo "ERROR: Can not connect to DB.\n";
  var_dump(pg_last_error($conn));
  exit;
}

pg_insert($conn, $table, $newValues);

// $result = pg_insert($conn, $table, $newValues);
// if (!$result) {
//   echo "ERROR: Can not return values from DB.\n";
//   var_dump(pg_last_error($conn));
//   exit;
// }

// while ($row = pg_fetch_row($result))
// {
//   echo $row[1] . "\n";
// }
?>