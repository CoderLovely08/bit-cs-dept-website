import pool from "../config/dbConfig.js";

export const getAllFaculty = async () => {
  try {
    const query = {
      text: `SELECT * FROM FacultyInfo ORDER BY faculty_id`,
    };
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.log(`Error in getAllFaculty() call: ${error}`);
    return [];
  }
};

export const getAllAcademicCalendar = async () => {
  try {
    const query = {
      text: `SELECT * FROM AcademicCalendarInfo ORDER BY calendar_id DESC`,
    };

    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.log(`Error in getAllAcademicCalendar() call: ${error}`);
    return [];
  }
};

export const getAllTableData = async (tableName, columnName, order = "ASC") => {
  try {
    const query = {
      text: `SELECT * FROM ${tableName} ${
        columnName ? `ORDER BY ${columnName} ${order}` : ""
      }`,
    };

    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.log(`Error in getAllTableData() call: ${error}`);
    return [];
  }
};

export const getAllSyllabusInfo = async () => {
  try {
    const query = {
      text: `
      SELECT * FROM SyllabusInfo si
      JOIN SemesterInfo semi
        ON semi.semester_id = si.semester_id
      `,
    };
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.log(`Error in getAllSyllabusInfo() call: ${error}`);
    return [];
  }
};

export const getAllPaperDetails = async (tableName) => {
  try {
    const query = {
      text: `
      SELECT * FROM ${tableName} ti
      JOIN SubjectsInfo si 
        ON si.subject_id = ti.subject_id
      ORDER BY semester_id
      `,
    };
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.log(`Error in getAllPaperDetails() call: ${error}`);
    return [];
  }
};

export const getAllLabManuals = async () => {
  try {
    const query = {
      text: `
      SELECT 
      	lmi.manual_title,
      	lmi.semester_id,
      	lmi.pdf_link_src,
      	si.subject_id,
      	si.subject_name,
      	si.subject_code	
      FROM LabManualsinfo lmi
      JOIN SubjectsInfo si
      	ON lmi.subject_id = si.subject_id
      ORDER BY lmi.semester_id
      `,
    };
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.log(`Error in getAllPaperDetails() call: ${error}`);
    return [];
  }
};
