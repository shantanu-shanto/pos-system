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

$category = isset($_GET['category']) ? $_GET['category'] : null;

// Fetch items based on category or fetch all items
if ($category) {
    $query = "SELECT * FROM stock WHERE category = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $category);
    $stmt->execute();
    $result = $stmt->get_result();
} else {
    $query = "SELECT * FROM stock";
    $result = $conn->query($query);
}

// Output items as cards
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo '<div class="item-card" data-name="' . $row['name'] . '" data-price="' . $row['price'] . '">';
        echo '<img src="' . $row['image_path'] . '" alt="' . $row['name'] . '">';
        echo '<h3>' . $row['name'] . '</h3>';
        echo '<p>$' . $row['price'] . '</p>';
        echo '</div>';
    }
} else {
    echo "No items found.";
}

$conn->close();
?>
