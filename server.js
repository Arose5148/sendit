const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // Serve static files from the 'public' directory
  if (req.url === '/') {
    fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
      if (err) throw err;
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
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