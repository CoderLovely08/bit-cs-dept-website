import { Router } from "express"; // Import Express Router
import { handleAdminLogin } from "../controllers/authController.js";
const router = Router(); // Create an instance of Express Router

router.route('/admin/login').post(handleAdminLogin);

export default router;