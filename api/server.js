const express = require("express");
const helmet = require("helmet");
const cors = require("cors");


const server = express();
const restricted = require("./middleware/restricted");


const authRouter = require("./auth/auth-router");
const taskRouter = require('./tasks/tasks-router')
const UserRouter = require("./users/user-router");
const adminRouter = require('./admin/admin-router')


server.use(express.json());
server.use(helmet());
server.use(cors());


server.use("/api/auth", authRouter);
server.use('/api/volunteers', taskRouter)
server.use('/api/admin', adminRouter)
server.use("/api/student", restricted, UserRouter);


server.get("/", (req, res) => {
  res.json({ server: "up" });
});


module.exports = server;
