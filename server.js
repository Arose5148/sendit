const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse POST data
app.use(bodyParser.urlencoded({ extended: false }));

// Root route to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle POST request from the form
app.post('/submit-form', (req, res) => {
  const { name, email, message } = req.body;

  // Configure your email service provider settings here
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sendit.works.node@gmail.com',
      pass: 'wkvk amjh bayc hwmi'
    }
  });

  const mailOptions = {
    from: email,
    to: 'carmen@sendit.works',
    subject: 'New message from SendIt contact form',
    text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error:', error);
      res.status(500).send('Oops! Something went wrong. Please try again later.');
    } else {
      console.log('Email sent:', info.response);
      res.send('Thank you for your message. We will get back to you soon.');
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
