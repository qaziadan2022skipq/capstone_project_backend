import express from "express";
import { getUser} from "../controllers/user.js"
import {verifyToken} from "../middleware/auth.js"

const router = express.Router();

router.get('/:id', getUser);
// router.get("/:id/story", getUserStory);

export default router;

