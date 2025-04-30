import {Request, Response} from "express";
import prisma from "../db/prisma.js";



export const sendMessage = async (req: Request, res: Response) : Promise<any> => {
    try {
        
        const {content} = req.body;
        console.log(req.user);
        const {id: recieverId} = req.params;
        const senderId = req.user.id;
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        let conversation  = await prisma.conversation.findFirst({
            where: {
                participantIds:{
                    hasEvery: [senderId, recieverId]
                }
            }
        });
        if(!conversation){
            conversation = await prisma.conversation.create({
                data:{
                    participantIds:{
                        set: [senderId, recieverId]
                    }
                }
            })
        }

        const newMessage = await prisma.message.create({
            data:{
                senderId,
                content: content,
                conversationId: conversation.id
            }
        })

        if(newMessage){
            conversation = await prisma.conversation.update({
                where: {
                    id: conversation.id
                },
                data:{
                    messages:{
                        connect:{
                            id: newMessage.id
                        }
                    }
                }
            })
        }

        res.status(201).json(newMessage);


    } catch (error) {
        console.log("Error in sendMessage!");
        res.status(500).json({error: "Internal server error!"});
    }
}

export const getMessages = async (req: Request, res: Response) : Promise<any> => {
    try {
        const {id: userToChatId} = req.params;
        const senderId = req.user.id;


        const conversation = await prisma.conversation.findFirst({
            where:{
                participantIds:{
                    hasEvery:[senderId, userToChatId]
                }
            },
            include:{
                messages:{
                    orderBy:{
                        createdAt: "asc"
                    }
                }
            }
        })

        if(!conversation){
            return res.status(200).json([])
        }

        res.status(200).json(conversation.messages);


    } catch (error) {
        console.log("Error in getMessages!");
        res.status(500).json({error: "Internal server error!"});
    }
}