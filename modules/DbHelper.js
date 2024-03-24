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
  semesterId,
  pdfSrc
) => {
  try {
    const query = {
      text: `
            INSERT INTO AcademicCalendarInfo(
                calendar_title,
                semester_id,
                pdf_link
            ) VALUES ($1, $2, $3)`,
      values: [title, semesterId, pdfSrc],
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
