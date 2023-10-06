import {Router} from "express";
import {getUser, getUserFriends, toggleFriend} from "../controllers/userController.js";
import {verifyToken} from "../middleware/authorization.js"

const router = Router();

// READ
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

// UPDATE
router.patch("/:id/:friendId", verifyToken, toggleFriend);

export default router;