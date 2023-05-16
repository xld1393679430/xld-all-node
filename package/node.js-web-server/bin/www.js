const http = require("http");
const serverHandle = require("./app");
const PORT = 3001;
const server = http.createServer(serverHandle);

server.listen(PORT, () => {
  console.log(`now is listen ${PORT}`);
});

module.exports = server;
