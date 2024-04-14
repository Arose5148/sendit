const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve the index.html file for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle form submission
app.post('/submit-form', (req, res) => {
  const { name, email, message } = req.body;

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    // Configure your email service provider settings here
    // For example, using Gmail SMTP:
    service: 'gmail',
    auth: {
      user: 'sendit.works.node@gmail.com',
      pass: 'wkvk amjh bayc hwmi'
    }
  });

  // Set up the email options
  const mailOptions = {
    from: email,
    to: 'carmen@sendit.works',
    subject: 'New message from SendIt contact form',
    text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending message. Please try again later.');
    } else {
      console.log('Email sent:', info.response);
      res.send('Message sent successfully!');
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});