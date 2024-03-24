import pool from "../config/dbConfig.js";

export const getAllAcademicCalendar = async () => {
  try {
    const query = {
      text: `SELECT * FROM AcademicCalendarInfo`,
    };

    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.log(`Error in getAllAcademicCalendar() call: ${error}`);
    return [];
  }
};
