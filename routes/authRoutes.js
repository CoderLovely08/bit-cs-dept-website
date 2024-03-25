import { Router } from "express"; // Import Express Router
import { handleAdminLogin, handleAdminLogout } from "../controllers/authController.js";
const router = Router(); // Create an instance of Express Router

router.route('/admin/login').post(handleAdminLogin);

router.route('/admin/logout').post(handleAdminLogout);


export default router;