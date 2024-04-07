import { Router } from "express"; // Import Express Router
import {
  handleViewAboutPage,
  handleViewCurriculumPage,
  handleViewDepartmentPage,
  handleViewExaminationPage,
  handleViewGalleryPage,
  handleViewStudentLogin,
  handleViewStudentRegister,
} from "../controllers/pageController.js";
import {
  isLoggedIn,
  verifyTokenMiddleware,
} from "../middlewares/jwtMiddleware.js";
const router = Router(); // Create an instance of Express Router

router.route("/register").get(isLoggedIn, handleViewStudentRegister);

router.route("/login").get(isLoggedIn, handleViewStudentLogin);

router.use(verifyTokenMiddleware(["student"]), (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.redirect("/page/login");
    else {
      res.locals.name = req.user?.username;

      next();
    }
  } catch (error) {
    console.log(error);
    res.render("404");
  }
});

router
  .route("/department")
  .get(verifyTokenMiddleware(["student"]), handleViewDepartmentPage);
router
  .route("/about")
  .get(verifyTokenMiddleware(["student"]), handleViewAboutPage);
router
  .route("/curriculum")
  .get(verifyTokenMiddleware(["student"]), handleViewCurriculumPage);
router
  .route("/examination")
  .get(verifyTokenMiddleware(["student"]), handleViewExaminationPage);
router
  .route("/gallery")
  .get(verifyTokenMiddleware(["student"]), handleViewGalleryPage);

export default router;
