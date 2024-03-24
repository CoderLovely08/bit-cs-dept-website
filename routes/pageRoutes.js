import { Router } from "express"; // Import Express Router
import { handleViewDepartmentPage } from "../controllers/pageController.js";
const router = Router(); // Create an instance of Express Router

router.route("/department").get(handleViewDepartmentPage);

export default router;
