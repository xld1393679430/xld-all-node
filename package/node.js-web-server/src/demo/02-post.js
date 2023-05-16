const http = require("http");
const qs = require("querystring");

const server = http.createServer((req, res) => {
  const { method, url } = req;
  const path = url.split("?")[0];
  const query = qs.parse(url.split("?")[1]);
  if (req.method === "POST") {
    let postData = "";

    req.on("data", (chunk) => {
      postData += chunk.toString();
    });

    req.on("end", () => {
      res.setHeader("Content-type", "application/json");

      const resData = {
        success: true,
        data: {
          method,
          url,
          path,
          query,
        },
      };
      res.end(JSON.stringify(resData));
    });
  }
});

server.listen(3000);

module.exports = server;
