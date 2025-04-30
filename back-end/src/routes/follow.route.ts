import express  from "express";
import protectRoute from "../middleware/protectRoute.js"
import { followUser } from "../controllers/follow.controller.js";



const router = express.Router();

router.post('/followUser', protectRoute, followUser)
//router.delete('/unfollow')


export default router