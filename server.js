const http = require('http');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/submit-form') {
    let formData = '';
    req.on('data', chunk => {
      formData += chunk.toString();
    });
    req.on('end', () => {
      const params = new URLSearchParams(formData);
      const name = params.get('name');
      const email = params.get('email');
      const message = params.get('message');

      const transporter = nodemailer.createTransport({
        // Configure your email service provider settings here
        // For example, using Gmail SMTP:
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
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Oops! Something went wrong. Please try again later.');
        } else {
          console.log('Email sent:', info.response);
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('Thank you for your message. We will get back to you soon.');
        }
      });
    });
  } else {
    // Serve static files from the 'public' directory
    // ... (Keep the existing code for serving static files)
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});