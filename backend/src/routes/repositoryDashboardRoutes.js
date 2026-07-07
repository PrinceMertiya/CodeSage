const express = require("express");

const router = express.Router();

const {
    dashboard
} = require("../controllers/repositoryDashboardController");

const {
    validateRepositoryId,
    validate
} = require("../middlewares/validation");

/**
 * @swagger
 * /repositories/{id}/dashboard:
 *   get:
 *     summary: Repository Dashboard
 *     tags:
 *       - Dashboard
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dashboard information
 */

router.get(
    "/:id/dashboard",
    validateRepositoryId,
    validate,
    dashboard
);

module.exports = router;