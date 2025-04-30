import express from "express";
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import postRoutes from "./routes/post.route.js"
import cookieParser from "cookie-parser";
import profileRoutes from "./routes/profile.route.js"
import followRoutes from  "./routes/follow.route.js"
import dotenv from "dotenv"

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
// app.get("/", (req, res) =>{
    // res.send("Hello world!");
// })

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/post", postRoutes)
app.use("/api/profile", profileRoutes)
app.use("/api/follow", followRoutes)



app.listen(5000, ()=>{
    console.log("Server is running on port 5000");
})