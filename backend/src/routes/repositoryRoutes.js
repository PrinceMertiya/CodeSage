const express = require("express");

const router = express.Router();

const {
    analyzeRepository
} = require("../controllers/repositoryController");

const {
    validateRepository,
    validate
} = require("../middlewares/validation");

router.post(
    "/analyze",
    validateRepository,
    validate,
    analyzeRepository
);

module.exports = router;