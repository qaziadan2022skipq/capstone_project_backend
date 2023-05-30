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
router.get("/user/:id",  userStory);
router.get("/",  getAllStories);
router.patch("/:id/upvote",verifyToken, upvote);
router.patch("/:id/downvote", verifyToken, downvotes);
router.post("/public/:id", verifyToken, publicStory);
router.post("/private/:id", verifyToken, privateStory);


export default router;
