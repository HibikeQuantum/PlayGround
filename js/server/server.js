const http = require("http");

const message = [];

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    res.writeHead(200, {"contents-type": "application/json"});
    res.end(JSON.stringify("HELLO WORLD"));
  } else if (req.method === "POST") {

  }
});

console.log("LISTENING ON :3000");
server.listen(3000, "localhost");
