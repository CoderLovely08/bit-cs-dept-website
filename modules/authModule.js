import pool from "../config/dbConfig.js";
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10;

export const verifyAdminLoginDetails = async (email, password) => {
    try {
        const query = {
            text: `
                SELECT admin_password FROM AdminInfo WHERE admin_email = $1
            `, values: [email]
        }

        const { rows, rowCount } = await pool.query(query);

        if (rowCount != 1) return {
            success: false,
            message: "Email is not registered",
            data: []
        }

        const storedPassword = rows[0]?.admin_password;
        const checkPassword = await bcrypt.compare(password, storedPassword)

        if (!checkPassword) return {
            success: false,
            message: "Invalid Password",
            data: []
        }

        const fetchAdminDataQuery = {
            text: `
                SELECT 
                    admin_id, 
                    admin_full_name, 
                    admin_email
                FROM AdminInfo
                WHERE admin_email = $1
            `,
            values: [email]
        }

        const adminData = await pool.query(fetchAdminDataQuery)

        return {
            success: true,
            message: "Login Successful",
            data: adminData.rows
        }
    } catch (error) {
        console.error(`Error in verifyAdminLoginDetails() call: ${error}`);
        return {
            success: false,
            message: error.message,
            data: []
        }
    }
}