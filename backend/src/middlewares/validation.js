const { body, param, validationResult } = require("express-validator");

const validateRepository = [

    body("repositoryUrl")
        .notEmpty()
        .withMessage("Repository URL is required")
        .isURL()
        .withMessage("Invalid URL")
        .matches(/^https:\/\/github\.com\//)
        .withMessage("Only GitHub repositories are supported")

];

const validateChat = [

    body("repositoryId")
        .notEmpty()
        .withMessage("Repository ID is required"),

    body("question")
        .notEmpty()
        .withMessage("Question is required")
        .isLength({ min: 3 })
        .withMessage("Question is too short")

];

const validateRepositoryId = [

    param("id")
        .notEmpty()
        .withMessage("Repository ID is required")

];

const validate = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json({

            success: false,

            errors: errors.array()

        });

    }

    next();

};

module.exports = {

    validateRepository,

    validateChat,

    validateRepositoryId,

    validate

};