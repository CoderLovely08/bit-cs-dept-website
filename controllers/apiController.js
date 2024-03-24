// Import necessary modules and middleware
import {
  supabaseGetFile,
  supabaseUploadFile,
} from "../middlewares/supabaseMiddleware.js"; // Import Supabase file operations middleware

// Handle POST request for admin login
export const handlePostAdminLogin = async (req, res) => {
  try {
    // Render index page
    res.render("index");
  } catch (error) {
    // Send error response if an error occurs
    res.send("error");
  }
};

// Handle fetching file URL
export const handleFetchFileUrl = async (req, res) => {
  try {
    // Get requested file name from query parameters
    const requestedFileName = req.query.fileName;
    // Retrieve file URL from Supabase
    const result = await supabaseGetFile(requestedFileName);
    // Respond with the result
    res.json({
      result,
    });
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
    console.log(req.file);
    // Extract file buffer and type from request
    const fileBuffer = req.file.buffer;
    const fileType = req.file.mimetype;
    // Upload file to Supabase
    const result = await supabaseUploadFile(fileBuffer, fileType);
    console.log(result);
    // Send success response
    res.json({
      success: true,
      message: "Done",
    });
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
export const handlePostQuestionPaper = async (req, res) => {
  try {
    // Extract file buffer and type from request
    const fileBuffer = req.file.buffer;
    const fileType = req.file.mimetype;
    // Upload question paper file to Supabase
    const result = await supabaseUploadFile(fileBuffer, fileType);
    // Further processing can be added here
    res.json({ success: true, message: "Question paper uploaded successfully." });
  } catch (error) {
    // Handle errors if any
    res.status(500).json({ success: false, error: error.message });
  }
};

// Handle POST request for uploading model paper
export const handlePostModelPaper = async (req, res) => {
  try {
    // Implement model paper upload logic here
    res.json({ success: true, message: "Model paper uploaded successfully." });
  } catch (error) {
    // Handle errors if any
    res.status(500).json({ success: false, error: error.message });
  }
};

// Handle POST request for uploading sessional paper
export const handlePostSessionalPaper = async (req, res) => {
  try {
    // Implement sessional paper upload logic here
    res.json({ success: true, message: "Sessional paper uploaded successfully." });
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
    // Implement academic calendar posting logic here
    res.json({ success: true, message: "Academic calendar posted successfully." });
  } catch (error) {
    // Handle errors if any
    res.status(500).json({ success: false, error: error.message });
  }
};
