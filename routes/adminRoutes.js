import { Router } from "express"; // Import Express Router
import {
  handleViewAdminDashboard,
  handleViewAdminLogin,
  handleViewPaymentHistory,
} from "../controllers/adminController.js";
import { verifyTokenMiddleware } from "../middlewares/jwtMiddleware.js";
const router = Router(); // Create an instance of Express Router

router.route("/login").get(handleViewAdminLogin);

router
  .route("/dashboard")
  .get(verifyTokenMiddleware(["admin"]), handleViewAdminDashboard);

router
  .route("/paymentHistory/:eventId")
  .get(verifyTokenMiddleware(["admin"]), handleViewPaymentHistory);
export default router;
