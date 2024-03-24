// Import necessary modules and middleware
import { createClient } from "@supabase/supabase-js"; // Import Supabase client
import { Router } from "express"; // Import Express Router
import {
    handleFetchFileUrl,
    handleFileUpload,
    handlePostNotice,
    handlePostSubject,
    handlePostAcademicCalendar,
    handlePostPaperDetails
} from "../controllers/apiController.js"; // Import controller functions
const router = Router(); // Create an instance of Express Router

import multer from "multer"; // Import multer for file upload

// Configure multer storage to store files in memory
const storage = multer.memoryStorage();
// Create a multer instance with the configured storage
const upload = multer({ storage: storage });

// Define routes

// Route for uploading and fetching files
router
    .route("/file")
    .post(upload.single("fileItem"), handleFileUpload) // POST request for file upload
    .get(handleFetchFileUrl); // GET request for fetching file URL

// Route for uploading question papers
router.route("/paper").post(upload.single("fileItem"), handlePostPaperDetails);

// Route for posting notices
router.route("/notice").post(handlePostNotice);

// Route for posting subjects
router.route("/subject").post(handlePostSubject);

// Route for posting academic calendars
router.route("/academicCalendar").post(handlePostAcademicCalendar);

// Export the router
export default router;
