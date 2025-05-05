import {Request, Response} from "express";
import prisma from "../db/prisma.js";


export const getPublications = async (req: Request, res: Response): Promise<any> => {
    try {
        // const {skip} = req.body;
        const posts = await prisma.publication.findMany({
            orderBy:{
                createdAt: 'desc'
            },
            take: 10,
            include:{
                author: true,
                comments: true,
            }
        })
        if(!posts){
            return res.status(401).json("Error u getPublications")
        }
        else{
            return res.status(201).json({
                posts
            })
        }

    } catch (error: any) {
        console.log("Error with creating publication" + error.message)
        res.status(500).json({error: "Error with creating publication"});
    }



}
export const getSuggested = async (req: Request, res: Response): Promise<any> => {
    try {
        const currentId = req.user.id;

        const suggestedUsers = await prisma.user.findMany({
            where:{
                id:{not: currentId},
                follows:{
                    none:{
                        followerId: currentId,
                    }
                }
            },
            select:{
                id: true,
                username: true,
                fullName: true,
                profilePic: true,
            },
            // orderBy:{
            //     //@ts-ignore
            //     random: true
            // },
            take: 4,
        })

        if(!suggestedUsers){
            console.log("Error in suggested users!");
            res.status(401).json({error: "Error in getting 4 users from db!"})
        }

        res.status(201).json({
            suggestedUsers
        })


    } catch (error) {
        console.log("Error in getSuggested!" + error);
        res.status(500).json({error: "Internal server error!"});
    }
}



export const createPublication = async (req: Request, res: Response): Promise<any> => {
    // return res.status(200).json("pog")
    try {
        const { content } = req.body;
        console.log(req.user);
        const posterId = req.user.id;
        if(!req.user || !req.user.id){
            
            return res.status(401).json({ error: "Unauthorized" });
        }
        if(!content){
            return res.status(400).json({error: "Content of post cannot be empty"});
        }

        const publication = await prisma.publication.create({
            data:{
                authorId: posterId,
                content
            }
        })

        if(publication){
            res.status(201).json({
                authorId: publication.authorId,
                content: publication.content
            })
        }else{
            return res.status(500).json({error: "Error creating publication!"})
        }


        
    } catch (error : any) {
        console.log("Error with creating publication" + error.message)
        res.status(500).json({error: "Error with creating publication"});
    }

};

export const createComment = async (req: Request, res: Response): Promise<any> =>{

    try{

        const {content, publicationId} = req.body;
        const authorId = req.user.id;
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        if(!content || !publicationId){
            return res.status(401).json({ error: "No content in comment" });
        }
        
        let publication= await prisma.publication.findFirst({
            where:{
                id: publicationId,
            }
        })
        if(!publication){
        return res.status(404).json({error: "No publicaton with that id has been found"})
        }

        const newComment = await prisma.comment.create({
            data:{
                content,
                publicationId,
                authorId,
            }
        })

        if(newComment){
            publication = await prisma.publication.update({
                where:{
                    id: publication.id
                },
                data:{
                    comments:{
                        connect:{
                            id: newComment.id
                        }
                    }
                }
            })
        }
         res.status(201).json(newComment);

    }catch(error: any){
        console.log("Error in postComment!");
        res.status(500).json({error: "Internal server error!"});
    }
}