const http = require("http");
const fs = require("fs");
const path = require("path");

const IndexPath = path.resolve(__dirname, "index.html");

const PORT = 8080;
const server = http.createServer((req, res) => {
  const { url } = req;
  if (url === "/" || url === "/index") {
    fs.readFile(IndexPath, function (err, data) {
      if (err) {
        throw err;
      } else {
        res.end(data);
      }
    });
  } else {
    // res.writeHead(200, { "Content-Type": "text/plain" });
    // res.end("Hello World\n");
    // throw 'error';
  }
});

server.listen(PORT, () => {
  console.log(`now is listen ${PORT}`);
});

module.exports = server;
