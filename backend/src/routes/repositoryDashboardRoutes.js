const express = require("express");

const router = express.Router();

const {
    dashboard
} = require("../controllers/repositoryDashboardController");

const {
    validateRepositoryId,
    validate
} = require("../middlewares/validation");

router.get(
    "/:id/dashboard",
    validateRepositoryId,
    validate,
    dashboard
);

module.exports = router;