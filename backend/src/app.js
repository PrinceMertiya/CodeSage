const express = require("express");
const cors = require("cors");
const swaggerUi =
    require("swagger-ui-express");

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

const swaggerDocument =
    require("./config/swagger");

const app = express();


/*
|--------------------------------------------------------------------------
| Global Middleware
|--------------------------------------------------------------------------
*/

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());


/*
|--------------------------------------------------------------------------
| Authentication
|--------------------------------------------------------------------------
*/

app.use(
    "/api/auth",
    authRoutes
);


/*
|--------------------------------------------------------------------------
| Repository Analysis / Chat
|--------------------------------------------------------------------------
*/

app.use(
    "/api/repository",
    repositoryRoutes
);

app.use(
    "/api/repository",
    repositoryChatRoutes
);


/*
|--------------------------------------------------------------------------
| Repository CRUD / Dashboard
|--------------------------------------------------------------------------
*/

app.use(
    "/api/repositories",
    repositoryCrudRoutes
);

app.use(
    "/api/repositories",
    repositoryDashboardRoutes
);


/*
|--------------------------------------------------------------------------
| Swagger
|--------------------------------------------------------------------------
*/

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);


/*
|--------------------------------------------------------------------------
| Error Handler
|--------------------------------------------------------------------------
*/

app.use(errorHandler);


module.exports = app;