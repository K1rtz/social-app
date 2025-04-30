import {Request, Response} from "express";
import prisma from "../db/prisma.js";


export const followUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const recieverUsername = req.body.content;
        const senderId = req.user.id;

        if (!req.user || !req.user.username) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        
        let reciever = await prisma.user.findUnique({
            where: {
                username: recieverUsername  
            },
            select: {
                id: true 
            }
        });
        
        if(!reciever){
            return res.status(404).json({error: "Reciever not found!"});
        }
        
        let followConnection  = await prisma.follows.findUnique({
            where: {
                followerId_followingId:{
                    followerId: senderId,
                    followingId: reciever.id
                }
            }
        });

        if(followConnection){
            console.log("Already following that person!" + senderId + ":" + reciever.id)
            return res.status(401).json({error: "You are already following that person"});
        }

        const followC = await prisma.follows.create({
            data:{
                followerId: senderId,
                followingId: reciever.id
            }
        })
        res.status(201).json(followC);

    } catch (error) {
        console.log("Error in followUser!" + error);
        res.status(500).json({error: "Internal server error!"});
    }
}