import pool from "../config/dbConfig.js";

export const storeQuestionPaperDetails = async (title, subjectId, pdfSrc) => {
  try {
    const query = {
      text: `
            INSERT INTO QuestionPaperInfo(
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
          ? "Question Paper Uploaded"
          : "Unable to upload question paper",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
