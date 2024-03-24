import pool from "../config/dbConfig.js";

export const storePaperDetails = async (type, title, subjectId, pdfSrc) => {
  try {
    const tableName =
      type == "question"
        ? "QuestionPaperInfo" // If type is "question", assign "QuestionPaperInfo"
        : type == "model"
        ? "ModelPaperInfo" // If type is "model", assign "ModelPaperInfo"
        : "SessionalPaperInfo"; // If type is neither "question" nor "model", assign "SessionalPaperInfo"

    console.log(tableName);
    const query = {
      text: `
            INSERT INTO ${tableName}(
                paper_title,
                subject_id,
                pdf_link
            ) VALUES ($1, $2, $3)`,
      values: [title, subjectId, pdfSrc],
    };

    const { rowCount } = await pool.query(query);
    return {
      success: rowCount == 1,
      message:
        rowCount == 1
          ? "Paper Details Uploaded"
          : "Unable to upload paper details",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const storeAcademicCalendarDetails = async (
  title,
  year,
  yearId,
  pdfSrc
) => {
  try {
    const query = {
      text: `
            INSERT INTO AcademicCalendarInfo(
                calendar_title,
                academic_year,
                year_id,
                pdf_link
            ) VALUES ($1, $2, $3, $4)`,
      values: [title, year, yearId, pdfSrc],
    };

    const { rowCount } = await pool.query(query);
    return {
      success: rowCount == 1,
      message:
        rowCount == 1
          ? "Academic Calendar Details Uploaded"
          : "Unable to upload Academic Calendar",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const storeGalleryImage = async (title, imageSrc) => {
  try {
    const query = {
      text: `
            INSERT INTO GalleryImages(
                image_title,
                image_link
            ) VALUES ($1, $2)`,
      values: [title, imageSrc],
    };

    const { rowCount } = await pool.query(query);
    return {
      success: rowCount == 1,
      message:
        rowCount == 1
          ? "Gallery Image Uploaded"
          : "Unable to upload gallery image",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const storeSubjectDetails = async (
  subjectName,
  subjectCode,
  semesterId
) => {
  try {
    const existsQuery = {
      text: `SELECT subject_code FROM SubjectsInfo WHERE subject_code = $1`,
      values: [subjectCode],
    };

    const subjectExists = await pool.query(existsQuery);

    if (subjectExists.rowCount > 0) {
      return {
        success: false,
        message: "Subject details already exists",
      };
    }

    const query = {
      text: `
            INSERT INTO SubjectsInfo(
                subject_name,
                subject_code,
                semester_id
            ) VALUES ($1, $2, $3)
            `,
      values: [subjectName, subjectCode, semesterId],
    };

    const { rowCount } = await pool.query(query);
    return {
      success: rowCount == 1,
      message:
        rowCount == 1
          ? "Subject Details Added"
          : "Unable to upload gallery image",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
