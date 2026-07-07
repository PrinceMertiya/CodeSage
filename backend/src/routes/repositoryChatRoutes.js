const express = require("express");

const router = express.Router();

const {
    repositoryChat
} = require("../controllers/repositoryChatController");

const {
    validateChat,
    validate
} = require("../middlewares/validation");

router.post(
    "/",
    validateChat,
    validate,
    repositoryChat
);

module.exports = router;