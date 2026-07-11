const jwt = require("jsonwebtoken");

const prisma = require("../config/database");


const protect = async (req, res, next) => {
    try {

        const authorization =
            req.headers.authorization;


        if (
            !authorization ||
            !authorization.startsWith("Bearer ")
        ) {

            return res.status(401).json({
                success: false,
                message:
                    "Authentication required"
            });

        }


        const token =
            authorization.split(" ")[1];


        if (!token) {

            return res.status(401).json({
                success: false,
                message:
                    "Authentication required"
            });

        }


        if (!process.env.JWT_SECRET) {

            throw new Error(
                "JWT_SECRET is not configured"
            );

        }


        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );


        const user =
            await prisma.user.findUnique({

                where: {
                    id: decoded.userId
                },

                select: {

                    id: true,

                    name: true,

                    email: true,

                    avatarUrl: true

                }

            });


        if (!user) {

            return res.status(401).json({
                success: false,
                message:
                    "User account no longer exists"
            });

        }


        req.user = user;

        next();

    } catch (error) {

        if (
            error.name === "JsonWebTokenError" ||
            error.name === "TokenExpiredError"
        ) {

            return res.status(401).json({
                success: false,
                message:
                    "Invalid or expired authentication token"
            });

        }


        next(error);

    }
};


module.exports = {
    protect
};