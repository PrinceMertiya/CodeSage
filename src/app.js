const express = require('express');

// const healthRoutes = require('./routes/healthRoutes');
const repositoryRoutes =
require("./routes/repositoryRoutes");

const app = express();

app.use(express.json());
app.use("/repository", repositoryRoutes);
// app.use('/health', healthRoutes);

module.exports = app;

