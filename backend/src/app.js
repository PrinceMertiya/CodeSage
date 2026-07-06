const express = require("express");

const repositoryRoutes =
    require("./routes/repositoryRoutes");

const repositoryChatRoutes =
    require("./routes/repositoryChatRoutes");

const app = express();

app.use(express.json());

app.use("/repository", repositoryRoutes);

app.use("/repository/chat", repositoryChatRoutes);

module.exports = app;