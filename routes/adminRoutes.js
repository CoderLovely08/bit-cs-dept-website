import { Router } from "express"; // Import Express Router
import { handleViewAdminLogin } from "../controllers/adminController.js";
const router = Router(); // Create an instance of Express Router

router.route("/login").get(handleViewAdminLogin);

export default router;
