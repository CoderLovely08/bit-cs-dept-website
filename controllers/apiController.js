import pool from "../config/dbConfig.js";


export const handleViewLandingPage = async (req, res) => {
  try {
    res.render("index");
  } catch (error) {
    res.send("error");
  }
};
