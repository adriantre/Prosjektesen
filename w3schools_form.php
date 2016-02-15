<!DOCTYPE HTML> 
<html>
<head>
<style>
.error {color: #FF0000;}
</style>
</head>
<body> 

<?php
$conn = pg_connect("host=92.62.34.78 port=5432 dbname=adrianto user=adrianto password=kalende");

// define variables and set to empty values
$nameErr = $emailErr = $passwordErr1 = $passwordErr2 = "";
$name = $email = $password1 = $password2 ="";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
   if (empty($_POST["name"])) {
     $nameErr = "Name is required";
   } else {
     $name = test_input($_POST["name"]);
     // check if name only contains letters and whitespace
     if (!preg_match("/^[a-zA-Z ]*$/",$name)) {
       $nameErr = "Only letters and white space allowed"; 
     }
   }
   
   if (empty($_POST["email"])) {
     $emailErr = "Email is required";
   } else {
     $email = test_input($_POST["email"]);
     // check if e-mail address is well-formed
     if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
       $emailErr = "Invalid email format"; 
     }
   }

   if (empty($_POST["password1"])) {
     $passwordErr1 = "Password is required";
   } else {
     $password1 = test_input($_POST["password1"]);
     // check that the password is at least 8 characters long and contains at 
     // least one of each of lowercase, uppercase and a number
     if (!preg_match("/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/",$password1)) {
       $passwordErr1 = "The password must be at least 8 characters long, and 
       contain a lowercase, uppercase and a number."; 
     }
   }

   if (empty($_POST["password2"])) {
     $passwordErr2 = "Password is required";
   } else {
     $password2 = test_input($_POST["password2"]);
     // check if name only contains letters and whitespace
     if ($_POST["password1"] != $_POST["password2"]) {
       $passwordErr2 = "Password does not match! Try again."; 
     }
   }

  $query = "INSERT INTO user(username, email, password) VALUES('" . $name . "', '" . $email . "', '" . $password . "')"; 
  $result = pg_query($conn, $query); 
      if (!$result) { 
        $errormessage = pg_last_error(); 
        echo "Error with query: " . $errormessage; 
        exit(); 
      } 
        printf ("These values were inserted into the database - %s %s %s", $name, $email, $password); 
        pg_close(); 


}

function test_input($data) {
   $data = trim($data);
   $data = stripslashes($data);
   $data = htmlspecialchars($data);
   return $data;
}
?>

<h2>PHP Form Validation Example</h2>
<p><span class="error">* required field.</span></p>
<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>"> 
   Name: <input type="text" name="name" value="<?php echo $name;?>">
   <span class="error">* <?php echo $nameErr;?></span>
   <br><br>
   E-mail: <input type="text" name="email" value="<?php echo $email;?>">
   <span class="error">* <?php echo $emailErr;?></span>
   <br><br>
   Password: <input type="text" name="password1" value="<?php echo $password1;?>">
   <span class="error">* <?php echo $passwordErr1;?></span>
   <br><br>
   Confirm password: <input type="text" name="password2" value="<?php echo $password2;?>">
   <span class="error">* <?php echo $passwordErr2;?></span>
   <br><br>
   <input type="submit" name="submit" value="Submit"> 
   <input type="reset" name="reset" value="Clear It"> 
</form>

<?php
echo "<h2>Your Input:</h2>";
echo $name;
echo "<br>";
echo $email;
echo "<br>";
echo $password1;
echo "<br>";
echo $password2;
?>

</body>
</html>