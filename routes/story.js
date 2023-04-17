import express from "express";
import {
  userStory,
  getAllStories,
  upvote,
  downvotes,
} from "../controllers/story.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

router.get("/:id", userStory);
router.get("/", getAllStories);
router.post("/upvote", upvote);
router.post("/downvote", downvotes);

export default router;
