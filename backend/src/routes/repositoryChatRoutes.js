const express = require("express");

const router = express.Router();

const {
    repositoryChat
} = require("../controllers/repositoryChatController");

const {
    validateChat,
    validate
} = require("../middlewares/validation");

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


router.post(
    "/",
    validateChat,
    validate,
    repositoryChat
);

module.exports = router;