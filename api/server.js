const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();
const restricted = require("./middleware/restricted");

const AuthRouter = require("./auth/auth-router");
const UserRouter = require("./users/user-router");

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use("/api/auth", AuthRouter);
server.use("/api/users", restricted, UserRouter);

server.get("/", (req, res) => {
  res.json({ server: "up" });
});

module.exports = server;
