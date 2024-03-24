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
    // Generate a random filename
    const filePath = `files/${crypto.randomUUID()}`;

    // Upload file to Supabase Storage
    const { data, error } = await supabaseClient.storage
      .from(process.env.SUPABASE_BUCKET_NAME) // Access the specified bucket
      .upload(`${filePath}`, fileBuffer, { // Upload the file
        contentType: fileType, // Specify content type of the file
      });

    // Check if upload was successful
    if (data) {
      console.log(`Data: ${JSON.stringify(data)}`); // Log uploaded data
      return data; // Return uploaded data
    } else {
      console.log(`Error: ${JSON.stringify(error)}`); // Log error if upload failed
      return error; // Return error object
    }
  } catch (error) {
    console.log(error); // Log any exception occurred during upload
    return false; // Return false to indicate failure
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

    res.json({
      data, // Respond with the data (public URL)
    });
  } catch (error) {
    console.log(error); // Log any error occurred during file retrieval
    res.json({
      error, // Respond with the error
    });
  }
};
