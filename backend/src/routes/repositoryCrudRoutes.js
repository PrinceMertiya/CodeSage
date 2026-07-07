const express = require("express");

const router = express.Router();

const {

    getAllRepositories,

    getRepository,

    deleteRepository

} = require("../controllers/repositoryCrudController");

router.get("/", getAllRepositories);

router.get("/:id", getRepository);

router.delete(

    "/:id",

    deleteRepository

);

module.exports = router;