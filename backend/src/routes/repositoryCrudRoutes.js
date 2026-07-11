const express = require("express");

const router = express.Router();

const {

    getAllRepositories,

    getRepository,

    deleteRepository,

    reanalyze,

    getChats,

    getTree,

    getFile

} = require(
    "../controllers/repositoryCrudController"
);

const {

    validateRepositoryId,

    validate

} = require(
    "../middlewares/validation"
);

const {
    protect
} = require(
    "../middlewares/authMiddleware"
);


/*
|--------------------------------------------------------------------------
| All Repository CRUD Routes Require Authentication
|--------------------------------------------------------------------------
*/

router.use(protect);


/*
|--------------------------------------------------------------------------
| Get All Repositories
|--------------------------------------------------------------------------
*/

router.get(
    "/",
    getAllRepositories
);


/*
|--------------------------------------------------------------------------
| Repository File Tree
|--------------------------------------------------------------------------
|
| Must appear before /:id so routing stays explicit.
|
*/

router.get(
    "/:id/tree",
    validateRepositoryId,
    validate,
    getTree
);


/*
|--------------------------------------------------------------------------
| Repository File Content
|--------------------------------------------------------------------------
|
| Example:
|
| GET /repositories/:id/file?path=src/components/Navbar.tsx
|
*/

router.get(
    "/:id/file",
    validateRepositoryId,
    validate,
    getFile
);


/*
|--------------------------------------------------------------------------
| Repository Chat History
|--------------------------------------------------------------------------
*/

router.get(
    "/:id/chats",
    validateRepositoryId,
    validate,
    getChats
);


/*
|--------------------------------------------------------------------------
| Reanalyze Repository
|--------------------------------------------------------------------------
*/

router.post(
    "/:id/reanalyze",
    validateRepositoryId,
    validate,
    reanalyze
);


/*
|--------------------------------------------------------------------------
| Get Repository By ID
|--------------------------------------------------------------------------
*/

router.get(
    "/:id",
    validateRepositoryId,
    validate,
    getRepository
);


/*
|--------------------------------------------------------------------------
| Delete Repository
|--------------------------------------------------------------------------
*/

router.delete(
    "/:id",
    validateRepositoryId,
    validate,
    deleteRepository
);


module.exports = router;