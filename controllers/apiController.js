// Import necessary modules and middleware
import validator from "validator";
import {
  supabaseGetFile,
  supabaseUploadFile,
} from "../middlewares/supabaseMiddleware.js"; // Import Supabase file operations middleware
import {
  deleteItem,
  storeAcademicCalendarDetails,
  storeGalleryImage,
  storeNoticeDetails,
  storePaperDetails,
  storeSubjectDetails,
} from "../modules/DbHelper.js";

// -------------------------------------------------
//                File Handlers
// -------------------------------------------------

// Handle fetching file URL
export const handleFetchFileUrl = async (req, res) => {
  try {
    // Get requested file name from query parameters
    const requestedFileName = req.query.fileName;
    // Retrieve file URL from Supabase
    const result = await supabaseGetFile(requestedFileName);
    // Respond with the result
    res.json(result);
  } catch (error) {
    // Handle errors and send appropriate response
    res.status(500).json({
      success: false,
      error: error.message,
      data: [],
    });
  }
};

// Handle file upload
export const handleFileUpload = async (req, res) => {
  try {
    // Extract file buffer and type from request
    const fileBuffer = req.file.buffer;
    const fileType = req.file.mimetype;
    // Upload file to Supabase
    const result = await supabaseUploadFile(fileBuffer, fileType);

    // Send success response
    res.json(result);
  } catch (error) {
    // Handle errors and send appropriate response
    res.json({
      error: error.message,
    });
  }
};

// -------------------------------------------------
//            Question Paper Handlers
// -------------------------------------------------

/**
 * Type: POST
 * Purpose: Route handler for uploading question paper
 */
export const handlePostPaperDetails = async (req, res) => {
  try {
    const { paperType, title, subjectId } = req.body;

    if (!paperType || !validator.isAlpha(paperType)) {
      return res.json({
        success: false,
        message: "Provide a valid paper type",
      });
    }

    if (!title || !validator.isAlphanumeric(title.replace(/\s/g, "").trim())) {
      return res.json({
        success: false,
        message: "Enter a valid question paper title",
      });
    }

    if (!subjectId || !validator.isNumeric(subjectId)) {
      return res.json({
        success: false,
        message: "Provide a valid Subject Detail",
      });
    }

    if (!req?.file?.buffer) {
      return res.json({
        success: false,
        message: "No PDF/Image document provided",
      });
    }

    // Extract file buffer and type from request
    const fileBuffer = req.file.buffer;
    const fileType = req.file.mimetype;
    // Upload question paper file to Supabase
    const result = await supabaseUploadFile(fileBuffer, fileType);
    // Further processing can be added here

    // If file upload failed
    if (!result?.success) {
      return res.json({
        success: false,
        message: "Unable to upload paper",
      });
    }

    const pdfSrcData = await supabaseGetFile(result.fileName);
    const pdfSrc = pdfSrcData?.publicUrl;
    // If file uplaoded

    const dbResult = await storePaperDetails(
      paperType,
      title,
      subjectId,
      pdfSrc
    );

    res.json({
      success: dbResult.success,
      message: dbResult.message,
    });
  } catch (error) {
    // Handle errors if any
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Type: POST
 * Purpose: Route handler for posting notice
 */
export const handleDeletePaper = async (req, res) => {
  try {
    const { id, paperType } = req.body;
    const tableName =
      paperType == "question"
        ? "QuestionPaperInfo" // If type is "question", assign "QuestionPaperInfo"
        : paperType == "model"
        ? "ModelPaperInfo" // If type is "model", assign "ModelPaperInfo"
        : "SessionalPaperInfo"; // If type is neither "question" nor "model", assign "SessionalPaperInfo"
    const columnName = "paper_id";
    const typeName =
      paperType == "question"
        ? "Question Paper"
        : paperType == "model"
        ? "Model Paper"
        : "Sessional Paper";
    const dbResult = await deleteItem(id, tableName, columnName, typeName);

    res.json({
      success: dbResult.success,
      message: dbResult.message,
    });
  } catch (error) {
    // Handle errors if any
    res.status(500).json({ success: false, error: error.message });
  }
};

// -------------------------------------------------
//              Noitce Handlers
// -------------------------------------------------

/**
 * Type: POST
 * Purpose: Route handler for posting notice
 */
export const handlePostNotice = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || title.replace(/\s/g, "").trim().length < 6) {
      return res.json({
        success: false,
        message: "Enter a valid notice title",
      });
    }

    // Extract file buffer and type from request
    const fileBuffer = req.file.buffer;

    if (!req?.file?.buffer) {
      return res.json({
        success: false,
        message: "No PDF/Image document provided",
      });
    }

    const fileType = req.file.mimetype;
    // Upload question paper file to Supabase
    const result = await supabaseUploadFile(fileBuffer, fileType);
    // Further processing can be added here

    // If file upload failed
    if (!result?.success) {
      return res.json({
        success: false,
        message: "Unable to upload paper",
      });
    }

    const pdfSrcData = await supabaseGetFile(result.fileName);
    const pdfSrc = pdfSrcData?.publicUrl;
    // If file uplaoded

    const dbResult = await storeNoticeDetails(title, pdfSrc);

    res.json({
      success: dbResult.success,
      message: dbResult.message,
    });
  } catch (error) {
    // Handle errors if any
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Type: DELETE
 * Purpose: Route handler for deleting notice
 */
export const handleDeleteNotice = async (req, res) => {
  try {
    const { id } = req.body;
    const tableName = "NoticeInfo";
    const columnName = "notice_id";
    const typeName = "Notice";
    const dbResult = await deleteItem(id, tableName, columnName, typeName);

    res.json({
      success: dbResult.success,
      message: dbResult.message,
    });
  } catch (error) {
    // Handle errors if any
    res.status(500).json({ success: false, error: error.message });
  }
};

// -------------------------------------------------
//            Subject Handlers
// -------------------------------------------------

/**
 * Type: POST
 * Purpose: Route handler for adding new subject
 */
export const handlePostSubject = async (req, res) => {
  try {
    const { subjectName, subjectCode, semesterId } = req.body;

    // Check if subjectName is provided and is a non-empty string
    if (!subjectName || !validator.isLength(subjectName, { min: 1 })) {
      return res.status(400).json({
        success: false,
        message: "Subject name must be provided and must be a non-empty string",
      });
    }

    // Check if subjectCode is provided and is a non-empty string
    if (!subjectCode || !validator.isLength(subjectCode, { min: 1 })) {
      return res.status(400).json({
        success: false,
        message: "Subject code must be provided and must be a non-empty string",
      });
    }

    // Check if semesterId is provided and is a positive integer
    if (!semesterId || !validator.isInt(String(semesterId), { min: 1 })) {
      return res.status(400).json({
        success: false,
        message: "Select a valid semester",
      });
    }

    const dbResult = await storeSubjectDetails(
      subjectName,
      subjectCode,
      semesterId
    );

    res.json({
      success: dbResult.success,
      message: dbResult.message,
    });
  } catch (error) {
    // Handle errors if any
    res.status(500).json({ success: false, error: error.message });
  }
};

// -------------------------------------------------
//            Academic Calendar Handlers
// -------------------------------------------------

/**
 * Type: POST
 * Purpose: Route handler to posting academic calendar
 */
export const handlePostAcademicCalendar = async (req, res) => {
  try {
    const { title, yearId, year, semesterId } = req.body;
    if (!title || !validator.isAlphanumeric(title.replace(/\s/g, "").trim())) {
      return res.json({
        success: false,
        message: "Enter a valid alphanumeric Academic Calendar title",
      });
    }

    if (!year || !year.match(/^\d{4}\s*-\s*\d{4}$/)) {
      return res.json({
        success: false,
        message: "Enter a valid Academic Calendar year Ex: 2023 - 2024",
      });
    }

    if (!yearId || !validator.isNumeric(yearId)) {
      return res.json({
        success: false,
        message: "Select a valid Year",
      });
    }

    if (!req?.file?.buffer) {
      return res.json({
        success: false,
        message: "No PDF/Image document provided",
      });
    }

    // Extract file buffer and type from request
    const fileBuffer = req.file.buffer;
    const fileType = req.file.mimetype;
    // Upload question paper file to Supabase
    const result = await supabaseUploadFile(fileBuffer, fileType);
    // Further processing can be added here

    // If file upload failed
    if (!result?.success) {
      return res.json({
        success: false,
        message: "Unable to upload paper",
      });
    }

    const pdfSrcData = await supabaseGetFile(result.fileName);
    const pdfSrc = pdfSrcData?.publicUrl;
    // If file uplaoded

    const dbResult = await storeAcademicCalendarDetails(
      title,
      year,
      yearId,
      pdfSrc
    );

    res.json({
      success: dbResult.success,
      message: dbResult.message,
    });
  } catch (error) {
    // Handle errors if any
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Type: POST
 * Purpose: Route handler to add a new gallery image
 */

export const handleDeleteAcademicCalendar = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id || !validator.isNumeric(id)) {
      return res.json({
        success: false,
        message: "Provide a valid item id",
      });
    }

    const tableName = "AcademicCalendarInfo";
    const columnName = "calendar_id";
    const typeName = "Academic Calendar";
    const dbResult = await deleteItem(id, tableName, columnName, typeName);

    res.json({
      success: dbResult.success,
      message: dbResult.message,
    });
  } catch (error) {
    // Handle errors if any
    res.status(500).json({ success: false, error: error.message });
  }
};

// -------------------------------------------------
//            Gallery Image Handlers
// -------------------------------------------------

/**
 * Type: POST
 * Purpose: Route handler to add a new gallery image
 */
export const handlePostGalleryImage = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || title.replace(/\s/g, "").trim().length < 6) {
      console.log(title);
      return res.json({
        success: false,
        message: "Enter a valid Image title with atleast 6 characters",
      });
    }

    const validImageTypes = ["image/jpeg", "image/png"]; // List of valid image MIME types
    const fileType = req?.file?.mimetype;

    // Validate file type
    if (!fileType || !validImageTypes.includes(fileType)) {
      return res.json({
        success: false,
        message: "Only image files (JPEG, PNG) are allowed",
      });
    }

    // Extract file buffer and type from request
    const fileBuffer = req.file.buffer;
    // Upload question paper file to Supabase
    const result = await supabaseUploadFile(fileBuffer, fileType);

    // If file upload failed
    if (!result?.success) {
      return res.json({
        success: false,
        message: "Unable to upload paper",
      });
    }

    const imageSrcData = await supabaseGetFile(result.fileName);
    const imageSrc = imageSrcData?.publicUrl;

    const dbResult = await storeGalleryImage(title, imageSrc);

    res.json({
      success: dbResult.success,
      message: dbResult.message,
    });
  } catch (error) {
    // Handle errors if any
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Type: DELETE
 * Purpose: Route handler to delete a new gallery image
 */
export const handleDeleteGalleryImage = async (req, res) => {
  try {
    const { id } = req.body;
    const tableName = "GalleryImages";
    const columnName = "image_id";
    const typeName = "Gallery Image";
    const dbResult = await deleteItem(id, tableName, columnName, typeName);

    res.json({
      success: dbResult.success,
      message: dbResult.message,
    });
  } catch (error) {
    // Handle errors if any
    res.status(500).json({ success: false, error: error.message });
  }
};
