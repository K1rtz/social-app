import express  from "express";
import protectRoute from "../middleware/protectRoute.js"
import { searchUsers, getUser  } from "../controllers/search.controller.js";



const router = express.Router();

router.get('/searchUsers', protectRoute, searchUsers )
router.get('/getUser', protectRoute, getUser)
//router.delete('/unfollow')


export default router