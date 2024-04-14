const http = require('http');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

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
    const filePath = path.join(PUBLIC_DIR, req.url === '/' ? 'index.html' : req.url);
    fs.readFile(filePath, (err, content) => {
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