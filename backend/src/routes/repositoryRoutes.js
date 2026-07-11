const express = require("express");

const router = express.Router();

const {
    analyzeRepository
} = require("../controllers/repositoryController");

const {
    validateRepository,
    validate
} = require("../middlewares/validation");

const {
    protect
} = require("../middlewares/authMiddleware");


/**
 * @swagger
 * /repository/analyze:
 *   post:
 *     summary: Analyze a GitHub repository
 *     tags:
 *       - Repository
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - repositoryUrl
 *             properties:
 *               repositoryUrl:
 *                 type: string
 *                 example: https://github.com/facebook/react
 *     responses:
 *       200:
 *         description: Repository analyzed successfully
 *       401:
 *         description: Authentication required
 */
router.post(
    "/analyze",
    protect,
    validateRepository,
    validate,
    analyzeRepository
);

module.exports = router;