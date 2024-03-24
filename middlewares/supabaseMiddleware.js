// Import necessary modules
import "dotenv/config"; // Load environment variables from .env file
import crypto from "crypto"; // Module for cryptographic functions
import { supabaseClient } from "../config/supabaseConfig.js"; // Import Supabase client configuration

/**
 * Uploads a file to Supabase Storage
 * @param {Buffer} fileBuffer - The file content as a buffer
 * @param {string} fileType - The type of the file (e.g., 'image/jpeg')
 * @returns {Object|Error|boolean} - Returns uploaded data if successful, error object if failed, or false if an exception occurred
 */
export const supabaseUploadFile = async (fileBuffer, fileType) => {
  try {
    const randomFileName = crypto.randomUUID();
    // Generate a random filename
    const filePath = `files/${randomFileName}`;

    // Upload file to Supabase Storage
    const { data, error } = await supabaseClient.storage
      .from(process.env.SUPABASE_BUCKET_NAME) // Access the specified bucket
      .upload(`${filePath}`, fileBuffer, {
        // Upload the file
        contentType: fileType, // Specify content type of the file
      });

    // Check if upload was successful
    if (data) {
      return {
        success: true,
        message: "File uploaded successfully",
        fileName: randomFileName,
      }; // Return uploaded data
    } else {
      return {
        success: false,
        message: error.error,
      };
    }
  } catch (error) {
    console.log(error); // Log any exception occurred during upload
    return {
      success: false,
      message: error.message,
    };
  }
};

/**
 * Retrieves a file from Supabase Storage
 * @param {string} fileName - The name of the file to retrieve
 * @returns {Object} - Returns the public URL of the file if successful, or error object if failed
 */
export const supabaseGetFile = async (fileName) => {
  try {
    // Retrieve public URL of the file from Supabase Storage
    const { data } = supabaseClient.storage
      .from(process.env.SUPABASE_BUCKET_NAME) // Access the specified bucket
      .getPublicUrl(`files/${fileName}`); // Get public URL of the file

    return {
      success: true,
      message: "File fetched",
      publicUrl: data.publicUrl,
    };
  } catch (error) {
    console.log(error); // Log any error occurred during file retrieval
    return {
      success: true,
      message: error.message,
    };
  }
};
