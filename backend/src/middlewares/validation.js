const {
    body,
    param,
    validationResult
} = require("express-validator");

// Analyze Repository
const validateRepository = [

    body("repositoryUrl")
        .notEmpty()
        .withMessage("Repository URL is required")

        .isURL()
        .withMessage("Invalid Repository URL")

        .matches(/^https:\/\/github\.com\/[^/]+\/[^/]+/)
        .withMessage("Only GitHub repositories are supported")

];

// Chat
const validateChat = [

    body("repositoryId")
        .notEmpty()
        .withMessage("Repository ID is required"),

    body("question")
        .notEmpty()
        .withMessage("Question is required")

        .isLength({ min: 3 })
        .withMessage("Question must contain at least 3 characters")

];

// Repository ID
const validateRepositoryId = [

    param("id")
        .notEmpty()
        .withMessage("Repository ID is required")

];

// Validation Result
const validate = (req, res, next) => {

    const errors =
        validationResult(req);

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