import { Router } from "express"; // Import Express Router
import { handleViewAboutPage, handleViewCurriculumPage, handleViewDepartmentPage, handleViewExaminationPage, handleViewGalleryPage } from "../controllers/pageController.js";
const router = Router(); // Create an instance of Express Router

router.route("/department").get(handleViewDepartmentPage);
router.route("/about").get(handleViewAboutPage);
router.route("/curriculum").get(handleViewCurriculumPage);
router.route("/examination").get(handleViewExaminationPage);
router.route("/gallery").get(handleViewGalleryPage);

export default router;
