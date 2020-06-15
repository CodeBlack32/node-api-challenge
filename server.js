const express = require("express");
const projectRouter = require("./projectRouter");
const actionRouter = require("./actionRouter");

const server = express();

server.use(express.json());
server.use("/api/actionData", actionRouter);
server.use("/api/projectData", projectRouter);

module.exports = server;
