import {Request, Response} from "express";
import prisma from "../db/prisma.js";


export const getPublications = async (req: Request, res: Response): Promise<any> => {
    try {
        // const {skip} = req.body;
        // const posts = await prisma.publication.findMany({
        //     orderBy:{
        //         createdAt: 'desc'
        //     },
        //     take: 10,
        //     include:{
        //         author: true,
        //         comments: true,
        //         publicationLikes: true,
        //     }
        // })
        const posts = await prisma.publication.findMany({
            orderBy:{
                createdAt: 'desc'
            },
            take: 10,
            include:{
                author:{
                    select:{
                        fullName: true,
                        username: true,
                        profilePic: true,
                    }
                },
                _count:{
                    select: {
                        comments: true
                    }
                },
                publicationLikes:{
                    include:{
                        user:{
                            select:{
                                fullName: true,
                                username: true,
                                profilePic: true,
                            }
                        }
                    }
                }
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

export const likePublication = async (req: Request, res: Response): Promise<any> =>{

    const publicationId = req.body.content;
    const userId = req.user.id;

    if(!req.user || !req.user.username){
        return res.status(401).json({error: "Unauthorized"})
    }

    let user = await prisma.user.findUnique({
        where:{
            id: userId,
        }
    })
    if(!user){
        return res.status(404).json({error:"User not found!"})
    }

    let publication = await prisma.publication.findUnique({
        where:{
            id: publicationId,
        }
    })
    if(!publication){
        return res.status(404).json({error: "Publication not found!"})
    }

    let likePub = await prisma.publicationLikes.findUnique({
        where:{
            userId_publicationId:{
                userId: userId,
                publicationId: publicationId
            }
        }
    })
    if(likePub){
        return res.status(400).json({error: "Already liked that post!"});
    }

    const likePublication = await prisma.publicationLikes.create({
        data:{
            publication:{
                connect:{ id: publicationId}
            },
            user:{
                connect: {id: userId}
            }
        }
    })
    if(!likePublication){
        return res.status(500).json({error:"Error in liking post"})
    }
    
    return res.status(201).json({likePublication})

}


export const getComments = async (req: Request, res: Response): Promise<any> =>{

    const { q } = req.query;
    console.log(q);
    if (typeof q !== 'string' || q.trim() === '') {
        return res.status(400).json({ error: 'Missing or invalid search query' });
      }


    try {

        const comments = await prisma.comment.findMany({
            where:{
                publicationId: q,
            },
            select:{
                author:{
                    select:{
                        fullName: true,
                        username: true,
                        profilePic: true,
                    }
                },
                createdAt: true,
                content: true,
            },
            orderBy:{
                createdAt: "desc",
            }
        })
        
        if(!comments){
            return res.status(404).json({error: "Error with getting publication"});
        }

        return res.status(201).json({comments})
        



    } catch (error: any) {
        console.log("Error with creating publication" + error.message)
        res.status(500).json({error: "Error with creating publication"});
    }
       
}