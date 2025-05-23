const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Redirect www to non-www and enforce HTTPS
app.use((req, res, next) => {
  const host = req.headers.host;
  const isWWW = host.startsWith('www.');
  const isHTTPS = req.headers['x-forwarded-proto'] === 'https';

  if (!isHTTPS) {
    return res.redirect(301, `https://${host}${req.url}`);
  }

  if (isWWW) {
    const nonWWW = host.replace(/^www\./, '');
    return res.redirect(301, `https://${nonWWW}${req.url}`);
  }

  next();
});

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

  console.log('Form data received:');
  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Message:', message);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'senditworks.mx@gmail.com', // your real Gmail login
    pass: 'paoq fzsx gjwk gbuf' // use the same app password you created
  }
});

const mailOptions = {
  from: 'noreply@sendit.works',
  to: 'carmen@sendit.works', // or info@ or both — your choice
  subject: 'New message from SendIt contact form',
  text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`
};


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send(`
        <html>
          <head>
            <title>Submission Error</title>
            <link rel="stylesheet" href="/styles.css">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
      console.log('Email sent:', info.response);
      res.send(`
        <html>
          <head>
            <title>Submission Received</title>
            <link rel="stylesheet" href="/styles.css">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
