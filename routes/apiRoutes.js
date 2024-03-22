import { Router } from "express";
import { handleViewLandingPage } from "../controllers/apiController.js";
const router = Router();

router.route('/login').post(handleViewLandingPage)

export default router