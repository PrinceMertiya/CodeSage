const express = require("express");

const router = express.Router();

const {

    getAllRepositories,

    getRepository,

    deleteRepository,

    reanalyze,

    getChats

} = require("../controllers/repositoryCrudController");

const {

    validateRepositoryId,

    validate

} = require("../middlewares/validation");

/**
 * @swagger
 * /repositories:
 *   get:
 *     summary: Get all repositories
 *     tags:
 *       - Repository
 *     responses:
 *       200:
 *         description: Repository list
 */

// Get All
router.get(
    "/",
    getAllRepositories
);

/**
 * @swagger
 * /repositories/{id}:
 *   get:
 *     summary: Get repository by ID
 *     tags:
 *       - Repository
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Repository details
 */

// Get One
router.get(
    "/:id",
    validateRepositoryId,
    validate,
    getRepository
);

/**
 * @swagger
 * /repositories/{id}:
 *   delete:
 *     summary: Delete repository
 *     tags:
 *       - Repository
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Repository deleted successfully
 */

// Delete
router.delete(
    "/:id",
    validateRepositoryId,
    validate,
    deleteRepository
);


/**
 * @swagger
 * /repositories/{id}/chats:
 *   get:
 *     summary: Get repository chat history
 *     tags:
 *       - AI Chat
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chat history
 */
// Chat History
router.get(
    "/:id/chats",
    validateRepositoryId,
    validate,
    getChats
);

/**
 * @swagger
 * /repositories/{id}/reanalyze:
 *   post:
 *     summary: Reanalyze repository
 *     tags:
 *       - Repository
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Repository reanalyzed successfully
 */

// Reanalyze
router.post(
    "/:id/reanalyze",
    validateRepositoryId,
    validate,
    reanalyze
);

module.exports = router;