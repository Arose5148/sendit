const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const nodemailer = require('nodemailer');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // Serve static files from the 'public' directory
  if (req.url === '/') {
    // ... (keep the existing code for serving static files)
  } else if (req.url === '/submit-form' && req.method === 'POST') {
    let requestBody = '';

    req.on('data', chunk => {
      requestBody += chunk.toString();
    });

    req.on('end', () => {
      const formData = querystring.parse(requestBody);
      const { name, email, message } = formData;

      // Configure Nodemailer transporter
      const transporter = nodemailer.createTransport({
        // Configure your email service provider settings here
        // For example, using Gmail SMTP:
        service: 'gmail',
        auth: {
          user: 'sendit.works.node@gmail.com',
          pass: 'wkvk amjh bayc hwmi'
        }
      });

      // Configure email options
      const mailOptions = {
        from: email,
        to: 'carmen@sendit.works',
        subject: 'New message from SendIt contact form',
        text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`
      };

      // Send email using Nodemailer
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error:', error);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Oops! Something went wrong. Please try again later.');
        } else {
          console.log('Email sent:', info.response);
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(`
            <!DOCTYPE html>
            <html>
            <head>
              <title>Message Sent</title>
            </head>
            <body>
              <h1>Thank you for your message!</h1>
              <p>We will get back to you soon.</p>
              <a href="/">Go back to the homepage</a>
            </body>
            </html>
          `);
        }
      });
    });
  } else {
    // ... (keep the existing code for handling other requests)
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});