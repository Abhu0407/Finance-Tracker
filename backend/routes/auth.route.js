import express from 'express';
import { login, signup, getUserInfo } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/getUser", protectRoute, getUserInfo);



export default router;
