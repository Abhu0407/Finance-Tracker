import express from 'express';
import { login, signup, getUserInfo } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import  unload  from '../middleware/upload.middleware.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/getUser", protectRoute, getUserInfo);

router.post("/upload-image", unload.single("image"), (req, res) => {
    // Handle image upload
    if(!req.file){
        return res.status(400).json({ message: "No file uploaded" });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
    }`;

    res.status(200).json({ imageUrl});
});

export default router;
