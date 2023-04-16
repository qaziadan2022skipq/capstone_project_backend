import express from "express";
import { userStory, getAllStories } from "../controllers/story.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

router.get("/:id",verifyToken ,userStory);
router.get("/",verifyToken, getAllStories)

export default router;