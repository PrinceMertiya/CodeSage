const express = require("express");

const router = express.Router();

const {
    repositoryChat
} = require("../controllers/repositoryChatController");

router.post(
    "/",
    repositoryChat
);

module.exports = router;