import express  from "express";
import { createPublication, getSuggested, createComment, getPublications, getComments, likePublication } from "../controllers/post.controller.js";
import protectRoute from "../middleware/protectRoute.js";


const router = express.Router();

router.post("/createpublication", protectRoute, createPublication);
router.post("/createComment", protectRoute, createComment);
router.get("/getPublications", getPublications)
router.get("/getSuggested", protectRoute, getSuggested);
router.get("/getComments", protectRoute, getComments);
router.post("/likePublication", protectRoute, likePublication);


export default router;