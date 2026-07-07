const express = require("express");

const router = express.Router();

const {
    analyzeRepository
} = require("../controllers/repositoryController");

const {
    validateRepository,
    validate
} = require("../middlewares/validation");

/**
 * @swagger
 * /repository/analyze:
 *   post:
 *     summary: Analyze a GitHub repository
 *     tags:
 *       - Repository
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               repositoryUrl:
 *                 type: string
 *                 example: https://github.com/facebook/react
 *     responses:
 *       200:
 *         description: Repository analyzed successfully
 */
router.post(
    "/analyze",
    validateRepository,
    validate,
    analyzeRepository
);

module.exports = router;