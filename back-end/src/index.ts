import express from "express";
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import postRoutes from "./routes/post.route.js"
import cookieParser from "cookie-parser";
import profileRoutes from "./routes/profile.route.js"
import followRoutes from  "./routes/follow.route.js"
import searchRoutes from "./routes/search.route.js"
import {app, server} from "./socket/socket.js"
import dotenv from "dotenv"
import path from "path"



dotenv.config();

const PORT = process.env.PORT || 5000;
const _dirname = path.resolve();

// const app = express();

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
app.use("/api/search", searchRoutes)


if(process.env.NODE_ENV !== "development"){
    app.use(express.static(path.join(__dirname, "/front-end/dist")));
    app.get("*",(req, res)=>{
        res.sendFile(path.join(__dirname, "front-end", "dist", "index.html"));
    })    
}    

server.listen(PORT, () => {
    console.log("Server is running on port " + PORT )
})

// app.listen(5000, ()=>{
//     console.log("Server is running on port 5000");
// })