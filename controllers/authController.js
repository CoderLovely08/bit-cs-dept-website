import validator from "validator";
import { genereateToken } from "../middlewares/jwtMiddleware.js";
import { registerStudent, validateStudentLoginDetails, verifyAdminLoginDetails } from "../modules/authModule.js";

export const handleAdminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate email
        if (!validator.isEmail(email))
            return res.status(400).json({
                success: false,
                message: "Email address is not valid",
            });

        const result = await verifyAdminLoginDetails(email, password);

        const statusCode = result.success ? 200 : 401;

        let responseObject = {
            success: result.success,
            message: result.message,
        };

        let token;
        //   Check if login was a success or not
        if (result.success) {
            // Generate a token
            const userObject = {
                userId: result.data[0].admin_id,
                username: result.data[0].admin_full_name,
                role: "admin",
            };
            token = await genereateToken(userObject);
            // If token generation is successful add token to response object
            if (token.succes) {
                responseObject = {
                    ...responseObject,
                    token: token.token,
                };
                res.cookie("token", token?.token, {
                    maxAge: 900000,
                    httpOnly: true,
                    secure: process.env.NODE_ENV == "prod",
                });
                return res.status(statusCode).json(responseObject);
            }
        }
        //   If unauthorized send appropriate response
        return res.status(statusCode).json(responseObject);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};

export const handleAdminLogout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.json({
            success: true,
            message: "Logout successful",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};

export const handleStudentRegistration = async (req, res) => {
    try {
        const {
            fullName,
            email,
            password,
            semesterId,
        } = req.body;

        // Validate name
        if (!validator.isAlpha(fullName.replace(/\s/g, "")))
            return res.status(400).json({
                success: false,
                message: "Name can only contain letters between [A-Za-z]",
            });
        // Validate email
        if (!validator.isEmail(email))
            return res.status(400).json({
                success: false,
                message: "Email address is not valid",
            });
        // Validate password
        if (!validator.isStrongPassword(password))
            return res.status(400).json({
                success: false,
                message: "Please use a strong alphanumeric password",
            });

        // Validate semester id
        if (!validator.isInt(semesterId))
            return res.status(400).json({
                success: false,
                message: "Semester Id missing",
            });

        const result = await registerStudent(
            fullName,
            email,
            password,
            semesterId,
        );

        const statusCode = result.success ? 201 : 400;
        res.status(statusCode).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};

export const handleStudentLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate email
        if (!validator.isEmail(email))
            return res.status(400).json({
                success: false,
                message: "Email address is not valid",
            });

        const result = await validateStudentLoginDetails(email, password);
        const statusCode = result.success ? 200 : 401;

        let responseObject = {
            success: result.success,
            message: result.message,
        };

        let token;
        //   Check if login was a success or not
        if (result.success) {
            // Generate a token
            const userObject = {
                userId: result.data[0].student_id,
                username: result.data[0].student_name,
                role: "student",
            };
            token = await genereateToken(userObject);
            // If token generation is successful add token to response object
            if (token.succes) {
                responseObject = {
                    ...responseObject,
                    token: token.token,
                };
                res.cookie("token", token?.token, {
                    maxAge: 2 * 600 * 1000,
                    httpOnly: true,
                    secure: process.env.NODE_ENV == "prod",
                });
                return res.status(statusCode).json(responseObject);
            }
        }
        //   If unauthorized send appropriate response
        return res.status(statusCode).json(responseObject);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};


export const handleUserLogout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.json({
            success: true,
            message: "Logout successful",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: [],
        });
    }
};