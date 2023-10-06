import {Router} from "express";
import {login} from "../controllers/authController.js";

const router = Router();

// register route is in app.js

router.post('/login', login); 

export default router;