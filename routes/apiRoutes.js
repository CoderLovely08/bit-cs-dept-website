// Import necessary modules and middleware
import { createClient } from "@supabase/supabase-js"; // Import Supabase client
import { Router } from "express"; // Import Express Router
import {
  handleFetchFileUrl,
  handleFileUpload,
  handlePostNotice,
  handlePostSubject,
  handlePostAcademicCalendar,
  handlePostPaperDetails,
  handlePostGalleryImage,
  handleDeleteNotice,
  handleDeleteGalleryImage,
  handleDeleteAcademicCalendar,
  handleDeletePaper,
} from "../controllers/apiController.js"; // Import controller functions
const router = Router(); // Create an instance of Express Router

import multer from "multer"; // Import multer for file upload
import { verifyTokenMiddleware } from "../middlewares/jwtMiddleware.js";

// Configure multer storage to store files in memory
const storage = multer.memoryStorage();
// Create a multer instance with the configured storage
const upload = multer({ storage: storage });

/**
 * Route for uploading and fetching files
 * POST request for uploading files, GET request for fetching file URL
 */
router
  .route("/file")
  .post(upload.single("fileItem"), handleFileUpload)
  .get(handleFetchFileUrl);

/**
 * Route for uploading question papers
 * POST request for uploading papers, DELETE request for deleting papers
 */
router
  .route("/paper")
  .post(
    verifyTokenMiddleware(["admin"]),
    upload.single("fileItem"),
    handlePostPaperDetails
  )
  .delete(verifyTokenMiddleware(["admin"]), handleDeletePaper);

/**
 * Route for posting notices
 * POST request for posting notices, DELETE request for deleting notices
 */
router
  .route("/notice")
  .post(
    verifyTokenMiddleware(["admin"]),
    upload.single("fileItem"),
    handlePostNotice
  )
  .delete(verifyTokenMiddleware(["admin"]), handleDeleteNotice);

/**
 * Route for posting subjects
 * POST request for posting subjects
 */
router.route("/subject").post(verifyTokenMiddleware(["admin"]), handlePostSubject);

/**
 * Route for posting academic calendars
 * POST request for posting academic calendars, DELETE request for deleting academic calendars
 */
router
  .route("/academicCalendar")
  .post(
    verifyTokenMiddleware(["admin"]),
    upload.single("fileItem"),
    handlePostAcademicCalendar
  )
  .delete(verifyTokenMiddleware(["admin"]), handleDeleteAcademicCalendar);

/**
 * Route for posting gallery images
 * POST request for posting gallery images, DELETE request for deleting gallery images
 */
router
  .route("/gallery")
  .post(
    verifyTokenMiddleware(["admin"]),
    upload.single("fileItem"),
    handlePostGalleryImage
  )
  .delete(verifyTokenMiddleware(["admin"]), handleDeleteGalleryImage);

// Export the router
export default router;
