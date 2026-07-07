const express = require("express");

const router = express.Router();

const {

    getAllRepositories,

    getRepository,

    deleteRepository,

    reanalyze,

    getChats

} = require("../controllers/repositoryCrudController");

router.get("/", getAllRepositories);

router.get("/:id", getRepository);

router.delete(

    "/:id",

    deleteRepository

);

router.get(
    "/:id/chats",
    getChats
)

router.post(

    "/:id/reanalyze",

    reanalyze

);

module.exports = router;