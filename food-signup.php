<?php
$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$username = $_POST['username'];
$password = $_POST['password'];

if (!empty($firstname) & !empty($lastname) & !empty($username) & !empty($password)) {
    echo "Welcome to the QuickCrave, $firstname $lastname";
}
else {
    echo "Please fill all the details";
}
?>