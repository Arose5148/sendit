const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // Serve static files from the 'public' directory
  if (req.url === '/') {
    fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
      if (err) throw err;
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
    });
  } else if (req.url === '/submit-form' && req.method === 'POST') {
    let requestBody = '';

    req.on('data', chunk => {
      requestBody += chunk.toString();
    });

    req.on('end', () => {
      const formData = querystring.parse(requestBody);
      const { name, email, message } = formData;

      // Process the form data and send email
      const nodemailer = require('nodemailer');

      const transporter = nodemailer.createTransport({
        // Configure your email service provider settings here
        // For example, using Gmail SMTP:
        service: 'gmail',
        auth: {
          user: 'sendit.works.node@gmail.com',
          pass: 'wkvk amjh bayc hwmi '
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
    fs.readFile(path.join(__dirname, 'public', req.url), (err, content) => {
      if (err) {
        if (err.code === 'ENOENT') {
          res.writeHead(404);
          res.end('File not found');
        } else {
          res.writeHead(500);
          res.end('Internal Server Error');
        }
      } else {
        res.writeHead(200);
        res.end(content);
      }
    });
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});