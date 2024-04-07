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


export const registerStudent = async (
    fullName,
    email,
    password,
    semesterId,
) => {
    try {
        const studentExistsQuery = {
            text: `SELECT student_id FROM StudentInfo WHERE student_email = $1`,
            values: [email],
        };

        const studentExists = await pool.query(studentExistsQuery);

        if (studentExists.rowCount > 0)
            return {
                success: false,
                message: "Student with same email already exists",
                data: [],
            };

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const query = {
            text: `INSERT INTO StudentInfo(
                student_name,
                student_email,
                student_password,
                semester_id
                ) VALUES ($1, $2, $3, $4)`,
            values: [
                fullName,
                email,
                hashedPassword,
                semesterId,
            ],
        };

        const { rows, rowCount } = await pool.query(query);
        return {
            success: rowCount == 1,
            message: "Student Registration Successful",
            data: rows,
        };
    } catch (error) {
        console.error(`Error in registerStudent() call: ${error}`);
        return {
            success: false,
            message: error.message,
            data: [],
        };
    }
};


export const validateStudentLoginDetails = async (email, password) => {
    try {
        const query = {
            text: `
                SELECT student_password FROM StudentInfo WHERE student_email = $1
            `,
            values: [email],
        };

        const { rows, rowCount } = await pool.query(query);

        if (rowCount != 1)
            return {
                success: false,
                message: "Email is not registered",
                data: [],
            };

        const storedPassword = rows[0]?.student_password;
        const checkPassword = await bcrypt.compare(password, storedPassword);

        if (!checkPassword)
            return {
                success: false,
                message: "Invalid Password",
                data: [],
            };

        const fetchStudentDataQuery = {
            text: `
                SELECT 
                    si.student_id, 
                    si.student_name, 
                    si.student_email
                FROM StudentInfo si
                WHERE student_email = $1
            `,
            values: [email],
        };

        const studentData = await pool.query(fetchStudentDataQuery);

        return {
            success: true,
            message: "Login Successful",
            data: studentData.rows,
        };
    } catch (error) {
        console.error(`Error in validateFacultyLoginDetails() call: ${error}`);
        return {
            success: false,
            message: error.message,
            data: [],
        };
    }
};