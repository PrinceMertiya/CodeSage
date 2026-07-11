const express = require("express");
const swaggerUi = require("swagger-ui-express");

const repositoryRoutes =
    require("./routes/repositoryRoutes");

const repositoryChatRoutes =
    require("./routes/repositoryChatRoutes");

const repositoryCrudRoutes =
    require("./routes/repositoryCrudRoutes");

const repositoryDashboardRoutes =
    require("./routes/repositoryDashboardRoutes");

const authRoutes =
    require("./routes/authRoutes");

const errorHandler =
    require("./middlewares/errorHandler");

const swaggerSpec =
    require("./config/swagger");


const app = express();


/*
|--------------------------------------------------------------------------
| Global Middleware
|--------------------------------------------------------------------------
*/

app.use(express.json());


/*
|--------------------------------------------------------------------------
| Swagger Documentation
|--------------------------------------------------------------------------
*/

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);


/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/

app.use(
    "/auth",
    authRoutes
);


/*
|--------------------------------------------------------------------------
| Repository Routes
|--------------------------------------------------------------------------
*/

app.use(
    "/repositories",
    repositoryDashboardRoutes
);

app.use(
    "/repository",
    repositoryRoutes
);

app.use(
    "/repositories",
    repositoryCrudRoutes
);

app.use(
    "/repository/chat",
    repositoryChatRoutes
);


/*
|--------------------------------------------------------------------------
| Error Handler
|--------------------------------------------------------------------------
*/

app.use(errorHandler);


module.exports = app;