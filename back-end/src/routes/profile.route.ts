import express  from "express";

const router = express.Router();

router.get("/me", (req, res) =>{
    res.send("MyProfile route");
})


export default router;