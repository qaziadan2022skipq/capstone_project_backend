import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import multer from "multer";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import { verifyToken } from "./middleware/auth.js";
import { createStory } from "./controllers/story.js";
import storyRoutes from "./routes/story.js";

dotenv.config();

// configurations
const __filname = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filname);

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ linit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Routes with files
app.post("/auth/register", upload.single("picturePath"), register);
app.post("/story", upload.single("media") || upload.single("storyVideo"), createStory);

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/story", storyRoutes);

const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`App is live at port ${PORT}`));
  })
  .catch((err) => console.log(err));
