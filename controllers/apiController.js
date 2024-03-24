// Import necessary modules and middleware
import validator from "validator";
import {
  supabaseGetFile,
  supabaseUploadFile,
} from "../middlewares/supabaseMiddleware.js"; // Import Supabase file operations middleware
import {
  storeAcademicCalendarDetails,
  storeGalleryImage,
  storePaperDetails,
} from "../modules/DbHelper.js";

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

// Handle file deletion (currently empty, to be implemented)
export const handleDeleteFile = async (req, res) => {
  try {
    // To be implemented
  } catch (error) {
    // To be implemented
  }
};

// Handle POST request for uploading question paper
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

// Handle POST request for posting notice
export const handlePostNotice = async (req, res) => {
  try {
    // Implement notice posting logic here
    res.json({ success: true, message: "Notice posted successfully." });
  } catch (error) {
    // Handle errors if any
    res.status(500).json({ success: false, error: error.message });
  }
};

// Handle POST request for posting subject
export const handlePostSubject = async (req, res) => {
  try {
    // Implement subject posting logic here
    res.json({ success: true, message: "Subject posted successfully." });
  } catch (error) {
    // Handle errors if any
    res.status(500).json({ success: false, error: error.message });
  }
};

// Handle POST request for posting academic calendar
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

export const handlePostGalleryImage = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || (title.replace(/\s/g, "").trim().length < 6)) {
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
