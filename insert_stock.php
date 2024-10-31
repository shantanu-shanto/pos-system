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

// Check if the form was submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $category = $_POST['category'];
    $name = $_POST['name'];
    $price = $_POST['price'];

    // Check if an image was uploaded
    if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
        $image = $_FILES['image'];
        $imagePath = 'uploads/' . basename($image['name']);
        
        // Move the uploaded file to the uploads directory
        if (move_uploaded_file($image['tmp_name'], $imagePath)) {
            // Prepare and bind
            $stmt = $conn->prepare("INSERT INTO stock (category, name, price, image_path) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("ssds", $category, $name, $price, $imagePath);

            // Execute and check if successful
            if ($stmt->execute()) {
                echo "Stock inserted successfully!";
            } else {
                echo "Error inserting stock: " . $stmt->error;
            }

            $stmt->close();
        } else {
            echo "Failed to upload image.";
        }
    } else {
        echo "No image was uploaded or there was an error.";
    }
}

$conn->close();
?>
