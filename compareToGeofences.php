<?php
$posX = filter_input(INPUT_GET, "x");
$posY = filter_input(INPUT_GET, "y");
echo $posX.",".$posY;


$conn = pg_connect("host=92.62.34.78 port=5432 dbname=adrianto user=adrianto password=kalende");
pg_set_error_verbosity($conn, PGSQL_ERRORS_VERBOSE);
if ($conn === false) {
  echo "An error occurred.\n";
  var_dump(pg_last_error($conn));
  exit;
}

$result = pg_query($conn, "SELECT point_id AS id, ST_AsText(location::geometry) AS location FROM points;");
if (!$result) {
  echo "An error asd occurred.\n";
  var_dump(pg_last_error($conn));
  exit;
}

while ($row = pg_fetch_row($result))
{
  echo $row[1] . "\n";
}
 


//$mysqli = new mysqli("app.grevlingbo.no", "adrian", "kalende", "klokka");
//if (mysqli_connect_errno()) {
//    printf("Connect failed: %s\n", mysqli_connect_error());
//    exit();
//}
//if ($result = $mysqli->query("SELECT point_id AS id, ST_AsText(location) AS location FROM points;;")) {
//    while ($obj = $result->fetch_object())
//    {
//        echo $obj->location . "\n";
//    }
    /* free result set */
//    $result->close();
//}

//$mysqli->close();
?>
