import { Router } from "express"; // Import Express Router
import { handleAdminLogin, handleAdminLogout, handleStudentLogin, handleStudentRegistration, handleUserLogout } from "../controllers/authController.js";
const router = Router(); // Create an instance of Express Router

router.route('/admin/login').post(handleAdminLogin);

router.route('/admin/logout').post(handleAdminLogout);

router.route('/student/register').post(handleStudentRegistration)
router.route('/student/login').post(handleStudentLogin)

router.route('/logout').post(handleUserLogout)


export default router;