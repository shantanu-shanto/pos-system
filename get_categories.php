<?php
$servername = "127.0.0.1";
$username = "root";
$password = "";
$database = "posphp";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch unique categories
$query = "SELECT DISTINCT category FROM stock";
$result = $conn->query($query);

// Output categories
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo '<div class="category">' . $row['category'] . '</div>';
    }
} else {
    echo "No categories found.";
}

$conn->close();
?>
