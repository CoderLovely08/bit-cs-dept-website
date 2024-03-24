import validator from "validator";
import { genereateToken } from "../middlewares/jwtMiddleware.js";
import { verifyAdminLoginDetails } from "../modules/authModule.js";

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