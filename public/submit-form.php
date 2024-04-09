<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    // Set recipient email address
    $to = "carmen@sendit.works";

    // Set email subject
    $subject = "New message from SendIt in Style contact form";

    // Compose email body
    $body = "Name: " . $name . "\n";
    $body .= "Email: " . $email . "\n";
    $body .= "Message: " . $message . "\n";

    // Set email headers
    $headers = "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        // Email sent successfully
        echo "Thank you for your message. We will get back to you soon.";
    } else {
        // Email sending failed
        echo "Oops! Something went wrong. Please try again later.";
    }
}
?>