import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import cookieParser from "cookie-parser";
import "dotenv/config";

// Creating app instance
const app = express();

const PORT = process.env.PORT;

// Set view engine to use EJS
app.set("view engine", "ejs");

// Setup middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Import routers
import apiRouter from "./routes/apiRoutes.js";
import authRouter from "./routes/authRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import pageRouter from "./routes/pageRoutes.js";
import { getAllTableData } from "./modules/pageModule.js";

// Home route
app.get("/", async (req, res) => {
  try {
    const faculty = await getAllTableData("FacultyInfo", "faculty_id");
    res.render("index", {
      faculty,
    });
  } catch (error) {
    console.error(error);
  }
});

// API routes
app.use("/api", apiRouter);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/page", pageRouter);

// Middleware to handle 404 errors
// app.use((req, res, next) => {
//     res.render("404");
// });

app.listen(PORT || 3000, (err) => {
  if (err) console.error(`Error running server: ${err}`);
  console.log(`Server running on port ${PORT}`);
});
