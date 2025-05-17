import {Request, Response} from "express";
import prisma from "../db/prisma.js";
import { getRecieverSocketId, io } from "../socket/socket.js";



export const sendMessage = async (req: Request, res: Response) : Promise<any> => {
    try {
        
        const {content} = req.body;
        // console.log(req.user);
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

        const reciever = await prisma.user.findUnique({
            where:{
                id: recieverId,
            }
        })
        if(!reciever){
            return res.status(404).json({error: "Reciever not found!"})
        }
        if(!conversation){
            conversation = await prisma.conversation.create({
                data:{
                    participantIds: [senderId, recieverId], // Postojeći ID-ji iz User tabele
                    participants: {
                        connect: [
                            { id: senderId },
                            { id: recieverId }
                        ]
                    } 
                }})
            }
            // console.log(conversation);
            // console.log('Creating message for conversation:', conversation.id);
            // console.log('arduino:', recieverId)
            // console.log('arduino:', content)
            const newMessage = await prisma.message.create({
                data:{
                    senderId,
                    content: content,
                    conversationId: conversation.id
                }
            })
            // console.log('DOSLO SE DOOVDE')

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


        const recieverSocketId = getRecieverSocketId(recieverId);
        if(recieverSocketId){
            io.to(recieverSocketId).emit("newMessage", newMessage)
        }

        res.status(201).json(newMessage);


    } catch (error) {
        console.log("Error in sendMessage!");
        res.status(500).json({error: "Internal server error!"});
    }
}



export const getChatUsers = async (req: Request, res: Response): Promise<any> => {
    const authUserId = req.user.id;
  
    try {
      const users = await prisma.user.findMany({
        where: {
          id: { not: authUserId },
        },
        select: {
          id: true,
          fullName: true,
          profilePic: true,
          username: true,
        },
      });
  
      const usersWithLastMessages = await Promise.all(users.map(async (user) => {
        const conversation = await prisma.conversation.findFirst({
          where: {
            participantIds: {
              hasEvery: [authUserId, user.id]
            }
          },
          include: {
            messages: {
              orderBy: { createdAt: 'desc' },
              take: 1,
            }
          }
        });
        return {
          ...user,
          lastMessage: conversation?.messages[0] || null,
        };
      }));
      
      return res.status(200).json(usersWithLastMessages);

    } catch (error) {
      console.error("Error in getChatUsers:", error);
      return res.status(500).json({ error: "Server error while fetching users." });
    }
  };

export const getConversations = async (req: Request, res: Response) : Promise<any> => {
    try{
        const userId = req.user.id;

        const conversations = await prisma.conversation.findMany({
            where: {
                participantIds: {
                    has: userId,
                }
            },
            include: {
                participants: {
                    select: {
                        id: true,
                        username: true,
                        fullName: true,
                        profilePic: true,
                    }
                },
                messages: {
                    orderBy: {
                        createdAt: 'desc'
                    },
                    take: 1 // poslednja poruka
                }
            }
        })
        if(!conversations){
            return res.status(200).json({error: "Nema konverzacija?"})
        }
        return res.status(200).json(conversations)

    }catch(error: any){
        return res.status(401).json({error:"greska na strani servera"})
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