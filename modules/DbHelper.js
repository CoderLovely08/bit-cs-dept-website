import pool from "../config/dbConfig.js";

// -------------------------------------------------
//                Exam Paper Handlers
// -------------------------------------------------
/**
 * Store paper details in the database.
 * @param {string} type - The type of paper ("question", "model", or "sessional").
 * @param {string} title - The title of the paper.
 * @param {number} subjectId - The ID of the subject to which the paper belongs.
 * @param {string} pdfSrc - The source link to the PDF file.
 * @returns {Promise<{success: boolean, message: string}>} An object indicating the success status and message.
 */
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

// -------------------------------------------------
//            Academic Calendar Handlers
// -------------------------------------------------
/**
 * Store academic calendar details in the database.
 * @param {string} title - The title of the academic calendar.
 * @param {string} year - The academic year of the calendar.
 * @param {number} yearId - The ID of the academic year.
 * @param {string} pdfSrc - The source link to the PDF file.
 * @returns {Promise<{success: boolean, message: string}>} An object indicating the success status and message.
 */
export const storeAcademicCalendarDetails = async (title, year, pdfSrc) => {
  try {
    const query = {
      text: `
            INSERT INTO AcademicCalendarInfo(
                calendar_title,
                academic_year,
                pdf_link
            ) VALUES ($1, $2, $3)`,
      values: [title, year, pdfSrc],
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

// -------------------------------------------------
//               Gallery Image Handlers
// -------------------------------------------------
/**
 * Store a gallery image in the database.
 * @param {string} title - The title of the gallery image.
 * @param {string} imageSrc - The source link to the image.
 * @returns {Promise<{success: boolean, message: string}>} An object indicating the success status and message.
 */
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

// -------------------------------------------------
//                Subject Handlers
// -------------------------------------------------
/**
 * Store subject details in the database.
 * @param {string} subjectName - The name of the subject.
 * @param {string} subjectCode - The code of the subject.
 * @param {number} semesterId - The ID of the semester to which the subject belongs.
 * @returns {Promise<{success: boolean, message: string}>} An object indicating the success status and message.
 */
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

// -------------------------------------------------
//                Notice Handlers
// -------------------------------------------------
/**
 * Store notice details in the database.
 * @param {string} title - The title of the notice.
 * @param {string} pdfSrc - The source link to the PDF file.
 * @returns {Promise<{success: boolean, message: string}>} An object indicating the success status and message.
 */
export const storeNoticeDetails = async (title, pdfSrc) => {
  try {
    const query = {
      text: `INSERT INTO NoticeInfo(notice_title, pdf_link) VALUES ($1, $2)`,
      values: [title, pdfSrc],
    };

    const { rowCount } = await pool.query(query);
    return {
      success: rowCount == 1,
      message: rowCount == 1 ? "Notice published" : "Unable to publish notice",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

/**
 * Delete an item from the database table.
 * @param {string | number} id - The identifier of the item to delete.
 * @param {string} tableName - The name of the table from which to delete the item.
 * @param {string} columnName - The name of the column used to identify the item.
 * @param {string} typeName - The type of item being deleted (e.g., "user", "product", etc.).
 * @returns {Promise<{success: boolean, message: string}>} An object indicating the success status and message.
 */
export const deleteItem = async (id, tableName, columnName, typeName) => {
  try {
    const query = {
      text: `DELETE FROM ${tableName} WHERE ${columnName} = $1`,
      values: [id],
    };

    const { rowCount } = await pool.query(query);
    return {
      success: rowCount == 1,
      message:
        rowCount == 1
          ? `${typeName} Deleted`
          : `${typeName} details do not exist`,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// -------------------------------------------------
//              Syllabus Handlers
// -------------------------------------------------

export const storeSyllabusDetails = async (
  title,
  semesterId,
  scheme,
  pdfSrc
) => {
  try {
    const query = {
      text: `INSERT INTO SyllabusInfo(syllabus_title, semester_id, pdf_link, scheme) VALUES ($1, $2, $3, $4)`,
      values: [title, semesterId, pdfSrc, scheme],
    };

    const { rowCount } = await pool.query(query);
    return {
      success: rowCount == 1,
      message:
        rowCount == 1 ? "Syllabus published" : "Unable to publish Syllabus",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const storeFacultyDetails = async (
  name,
  designation,
  imageSrc,
  experience,
  description
) => {
  try {
    const query = {
      text: `INSERT INTO FacultyInfo(faculty_name, faculty_designation ,image_link, experience, description) VALUES ($1, $2, $3, $4, 45)`,
      values: [name, designation, imageSrc, experience, description],
    };

    const { rowCount } = await pool.query(query);
    return {
      success: rowCount == 1,
      message: rowCount == 1 ? "Faculty Added" : "Unable to add new faculty",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const storeEventsDetails = async (
  title,
  description,
  imageSrc,
  date
) => {
  try {
    const query = {
      text: `
      INSERT INTO EventsInfo(
        event_title,
        event_description,
        image_link,
        event_date
      ) VALUES ($1, $2, $3, $4)`,
      values: [title, description, imageSrc, date],
    };

    const { rowCount } = await pool.query(query);
    return {
      success: rowCount == 1,
      message:
        rowCount == 1
          ? "Event Details added successfully"
          : "Unable to add event details",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const storePaidEventsDetails = async (
  title,
  description,
  date,
  amount,
  eventImageUrl,
  receiverName,
  upiId
) => {
  try {
    const query = {
      text: `
      INSERT INTO PaidEventsInfo(
        event_title,
        event_description,
        event_date,
        amount,
        image_link,
        receiver_name,
        upi_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      values: [
        title,
        description,
        date,
        amount,
        eventImageUrl,
        receiverName,
        upiId,
      ],
    };

    const { rowCount } = await pool.query(query);
    return {
      success: rowCount === 1,
      message:
        rowCount === 1
          ? "Paid Event Details added successfully"
          : "Unable to add paid event details",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const storeLabManualDetails = async (
  title,
  link,
  semesterId,
  subjectId
) => {
  try {
    const checkQuery = {
      text: `
      SELECT manual_id FROM LabManualsInfo WHERE semester_id = $1 AND subject_id = $2
      `,
      values: [semesterId, subjectId],
    };

    const checkQueryResult = await pool.query(checkQuery);

    if (checkQueryResult.rowCount > 0) {
      return {
        success: false,
        message:
          "Lab Manual for the selected semester and subject combination already exists",
      };
    }

    const query = {
      text: `
        INSERT INTO LabManualsInfo(
          manual_title,
          semester_id,
          subject_id,
          pdf_link_src
        ) VALUES ($1, $2, $3, $4)
      `,
      values: [title, semesterId, subjectId, link],
    };

    const { rowCount } = await pool.query(query);
    return {
      success: rowCount == 1,
      message:
        rowCount == 1
          ? "Lab Manual added successfully"
          : "Unable to add Lab Manual",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getAllSemesters = async () => {
  try {
    const query = {
      text: `SELECT * FROM SemesterInfo`,
    };

    const { rows } = await pool.query(query);
    return {
      success: true,
      message: "Data fetched",
      data: rows,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: [],
    };
  }
};

export const postPaidEvents = async (studentId, imageLink, eventId) => {
  try {
    const query = {
      text: `INSERT INTO TransactionsInfo (student_id, image_link, event_id) VALUES ($1, $2, $3)`,
      values: [studentId, imageLink, eventId],
    };

    const { rowCount } = await pool.query(query);

    return {
      success: rowCount === 1,
      message:
        rowCount === 1
          ? "Your payment details have been added successfully"
          : "Unable to add payment details",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getPaidEventsTransactionsById = async (eventId) => {
  try {
    const query = {
      text: `
        SELECT
        	ti.student_id,
        	si.student_name,
        	si.semester_id,
        	si.student_email,
        	ti.transaction_id,
        	ti.created_at,
        	ti.image_link,
        	ti.event_id
        FROM StudentInfo si
        JOIN TransactionsInfo ti
        	ON ti.student_id = si.student_id
        WHERE event_id = $1
      `,
      values: [eventId],
    };

    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getPaidEventById = async (eventId) => {
  try {
    const query = {
      text: `SELECT * FROM PaidEventsInfo WHERE event_id = $1`,
      values: [eventId],
    };
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const chekPaymentStatus = async (studentId) => {
  try {
    const query = {
      text: `
      SELECT pei.event_id, ti.transaction_id, ti.created_at
      FROM PaidEventsInfo pei
      LEFT JOIN TransactionsInfo ti
        ON pei.event_id = ti.event_id
        AND ti.student_id = $1`,
      values: [studentId],
    };
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

/**
 * Store contact form details in the database.
 * @param
 * @returns {Promise<{success: boolean, message: string}>} An object indicating the success status and message.
 */
export const storeContactFormDetails = async (name, email, phone, message) => {
  try {
    const query = {
      text: `
        INSERT INTO ContactFormInfo(
          contact_name,
          contact_email,
          contact_phone,
          contact_message
        ) VALUES ($1, $2, $3, $4)
      `,
      values: [name, email, phone, message],
    };

    const { rowCount } = await pool.query(query);
    return {
      success: rowCount == 1,
      message:
        rowCount == 1
          ? "Contact form details stored"
          : "Unable to store contact form details",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
