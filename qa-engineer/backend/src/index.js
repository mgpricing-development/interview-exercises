require("dotenv").config();

const http = require("http");
const app = require("./app");
const server = http.createServer(app);

const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

process.on("uncaughtException", function (err) {
  console.log("uncaughtException", err);
  process.exit(1);
});

process.on("unhandledRejection", function (err) {
  console.log("unhandledRejection", err);
  process.exit(1);
});

