const express = require("express");

const repositoryRoutes =
    require("./routes/repositoryRoutes");

const repositoryChatRoutes =
    require("./routes/repositoryChatRoutes");

const repositoryCrudRoutes =
    require("./routes/repositoryCrudRoutes");

const errorHandler =
    require("./middlewares/errorHandler");

const app = express();

app.use(express.json());



const repositoryDashboardRoutes =
    require("./routes/repositoryDashboardRoutes");

app.use(

    "/repositories",

    repositoryDashboardRoutes

);

app.use("/repository", repositoryRoutes);

app.use(
    "/repositories",
    repositoryCrudRoutes
);

app.use("/repository/chat", repositoryChatRoutes);

app.use(errorHandler);

module.exports = app;