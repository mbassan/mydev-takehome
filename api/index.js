require("dotenv").config();
const http = require("http");
const db = require("./db/db.module");
const { Log } = require("./db/util");
const app = require("./app");

db.init();

const httpServer = http.createServer(app);
const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  Log.info(`Listening on port: ${PORT}`);
});

process.on("uncaughtException", (err) => {
  Log.error("Uncaught exception: ", err);
});
