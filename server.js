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
      res.status(500).send(`
        <html>
        <head>
          <title>Submission Error</title>
          <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
          <div class="container">
            <h1>Submission Error</h1>
            <p>Oops! Something went wrong. Please try again later.</p>
            <a href="/" class="button">Return Home</a>
          </div>
        </body>
        </html>
      `);
    } else {
      res.send(`
        <html>
        <head>
          <title>Submission Received</title>
          <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
          <div class="container">
            <h1>Thank You, ${name}!</h1>
            <p>Your message has been sent successfully. We will get back to you soon.</p>
            <a href="/" class="button">Return Home</a>
          </div>
        </body>
        </html>
      `);
    }
  });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
