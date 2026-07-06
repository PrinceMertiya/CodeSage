const express = require("express");

const router = express.Router();

const {

    getAllRepositories,

    getRepository

} = require("../controllers/repositoryCrudController");

router.get("/", getAllRepositories);

router.get("/:id", getRepository);

module.exports = router;