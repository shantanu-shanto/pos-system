$(document).ready(function () {
    $("#stockForm").on("submit", function (e) {
        e.preventDefault(); // Prevent form from submitting normally

        var formData = new FormData(this); // Create FormData object with form data
        
        $.ajax({
            url: 'insert_stock.php', // PHP script to process the form
            type: 'POST',
            data: formData,
            contentType: false, // Don't set content type automatically
            processData: false, // Don't process the files
            success: function (response) {
                alert(response); // Show success or error message
                $("#stockForm")[0].reset(); // Clear the form after success
            },
            error: function () {
                alert('An error occurred. Please try again.');
            }
        });
    });
});

$(document).ready(function () {
    // Function to load categories
    function loadCategories() {
        $.ajax({
            url: 'get_categories.php',
            method: 'GET',
            success: function (response) {
                $('#categoryList').html(response);
            }
        });
    }

    // Function to load items by category
    function loadItems(category = null) {
        $.ajax({
            url: 'get_items.php',
            method: 'GET',
            data: { category: category },
            success: function (response) {
                $('#itemList').html(response);
            }
        });
    }

    // Load all categories and items on page load
    loadCategories();
    loadItems();

    // Handle category click event
    $(document).on('click', '.category', function () {
        const category = $(this).text(); // Get the category text
        loadItems(category);
    });

    // Bill management
    let bill = [];
    let total = 0;

    // Add item to the bill
    $(document).on('click', '.item-card', function () {
        const itemName = $(this).data('name');
        const itemPrice = parseFloat($(this).data('price'));

        // Add item to the bill array
        bill.push({ name: itemName, price: itemPrice });
        total += itemPrice;

        // Update the bill UI
        $('#billList').append(`<li>${itemName} - $${itemPrice.toFixed(2)}</li>`);
        $('#billTotal').text(`Total: $${total.toFixed(2)}`);
    });
});

$(document).ready(function () {
    let bill = [];
    let total = 0;

    // Function to load categories
    function loadCategories() {
        $.ajax({
            url: 'get_categories.php',
            method: 'GET',
            success: function (response) {
                $('#categoryList').html(response);
            }
        });
    }

    // Function to load items by category
    function loadItems(category = null) {
        $.ajax({
            url: 'get_items.php',
            method: 'GET',
            data: { category: category },
            success: function (response) {
                $('#itemList').html(response);
            }
        });
    }

    // Load all categories and items on page load
    loadCategories();
    loadItems();

    // Handle category click event
    $(document).on('click', '.category', function () {
        const category = $(this).text(); // Get the category text
        loadItems(category);
    });

    // Add item to the bill
    $(document).on('click', '.item-card', function () {
        const itemName = $(this).data('name');
        const itemPrice = parseFloat($(this).data('price'));

        // Add item to the bill array
        bill.push({ name: itemName, price: itemPrice });
        total += itemPrice;

        // Update the bill UI
        $('#billList').append(`<li>${itemName} - $${itemPrice.toFixed(2)}</li>`);
        $('#billTotal').text(`Total: $${total.toFixed(2)}`);
    });

    // Checkout button to print the receipt
    $('#checkoutButton').on('click', function () {
        if (bill.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        // Generate receipt content
        let receiptContent = 'Receipt\n';
        receiptContent += '-------------------------\n';

        bill.forEach(function (item, index) {
            receiptContent += `${index + 1}. ${item.name} - $${item.price.toFixed(2)}\n`;
        });

        receiptContent += '-------------------------\n';
        receiptContent += `Total: $${total.toFixed(2)}\n`;
        receiptContent += 'Thank you for your purchase!\n';

        // Print the receipt
        let receiptWindow = window.open('', '', 'width=400,height=600');
        receiptWindow.document.write('<pre>' + receiptContent + '</pre>');
        receiptWindow.document.close();
        receiptWindow.print();

        // Clear the bill after checkout
        bill = [];
        total = 0;
        $('#billList').empty();
        $('#billTotal').text(`Total: $0.00`);
    });
});
