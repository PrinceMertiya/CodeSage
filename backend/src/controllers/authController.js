const bcrypt = require("bcryptjs");

const prisma = require("../config/database");

const {
    generateToken
} = require("../utils/generateToken");


const signup = async (req, res, next) => {
    try {

        const {
            name,
            email,
            password
        } = req.body;


        if (!name || !email || !password) {

            return res.status(400).json({
                success: false,
                message:
                    "Name, email and password are required"
            });

        }


        const normalizedEmail =
            email.trim().toLowerCase();


        if (password.length < 8) {

            return res.status(400).json({
                success: false,
                message:
                    "Password must be at least 8 characters long"
            });

        }


        const existingUser =
            await prisma.user.findUnique({

                where: {
                    email: normalizedEmail
                }

            });


        if (existingUser) {

            return res.status(409).json({
                success: false,
                message:
                    "An account with this email already exists"
            });

        }


        const hashedPassword =
            await bcrypt.hash(
                password,
                12
            );


        const user =
            await prisma.user.create({

                data: {

                    name: name.trim(),

                    email: normalizedEmail,

                    password: hashedPassword

                },

                select: {

                    id: true,

                    name: true,

                    email: true,

                    avatarUrl: true,

                    createdAt: true

                }

            });


        const token =
            generateToken(user.id);


        return res.status(201).json({

            success: true,

            message:
                "Account created successfully",

            token,

            user

        });

    } catch (error) {

        next(error);

    }
};


const login = async (req, res, next) => {
    try {

        const {
            email,
            password
        } = req.body;


        if (!email || !password) {

            return res.status(400).json({
                success: false,
                message:
                    "Email and password are required"
            });

        }


        const normalizedEmail =
            email.trim().toLowerCase();


        const user =
            await prisma.user.findUnique({

                where: {
                    email: normalizedEmail
                }

            });


        if (!user) {

            return res.status(401).json({
                success: false,
                message:
                    "Invalid email or password"
            });

        }


        const passwordMatches =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!passwordMatches) {

            return res.status(401).json({
                success: false,
                message:
                    "Invalid email or password"
            });

        }


        const token =
            generateToken(user.id);


        return res.status(200).json({

            success: true,

            message:
                "Logged in successfully",

            token,

            user: {

                id: user.id,

                name: user.name,

                email: user.email,

                avatarUrl: user.avatarUrl,

                createdAt: user.createdAt

            }

        });

    } catch (error) {

        next(error);

    }
};


const getMe = async (req, res, next) => {
    try {

        const user =
            await prisma.user.findUnique({

                where: {
                    id: req.user.id
                },

                select: {

                    id: true,

                    name: true,

                    email: true,

                    avatarUrl: true,

                    createdAt: true,

                    updatedAt: true

                }

            });


        if (!user) {

            return res.status(404).json({
                success: false,
                message:
                    "User not found"
            });

        }


        return res.status(200).json({

            success: true,

            user

        });

    } catch (error) {

        next(error);

    }
};


module.exports = {

    signup,

    login,

    getMe

};