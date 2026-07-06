const express = require("express");

const router = express.Router();

const {

    dashboard

} = require("../controllers/repositoryDashboardController");

router.get(

    "/:id/dashboard",

    dashboard

);

module.exports = router;