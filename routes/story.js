import express from "express";
import {
  userStory,
  getAllStories,
  upvote,
  downvotes,
  trendingStories,
  publicStory,
  privateStory,
} from "../controllers/story.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

router.get("/trending", trendingStories);
router.get("/:id", userStory);
router.get("/", getAllStories);
router.post("/upvote", upvote);
router.post("/downvote", downvotes);
router.post("/public/:id", publicStory);
router.post("/private/:id", privateStory);


export default router;
