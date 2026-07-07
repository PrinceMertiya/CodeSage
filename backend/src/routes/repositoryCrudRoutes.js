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

// Get All
router.get(
    "/",
    getAllRepositories
);

// Get One
router.get(
    "/:id",
    validateRepositoryId,
    validate,
    getRepository
);

// Delete
router.delete(
    "/:id",
    validateRepositoryId,
    validate,
    deleteRepository
);

// Chat History
router.get(
    "/:id/chats",
    validateRepositoryId,
    validate,
    getChats
);

// Reanalyze
router.post(
    "/:id/reanalyze",
    validateRepositoryId,
    validate,
    reanalyze
);

module.exports = router;