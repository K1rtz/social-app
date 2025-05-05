import {Request, Response} from "express";
import prisma from "../db/prisma.js";


export const searchUsers  = async (req: Request, res: Response): Promise<any> => {
    try {
        // const {skip} = req.body;
        const { q } = req.query;
        const currentUserId = req.user.id;

        if (typeof q !== 'string' || q.trim() === '') {
            return res.status(400).json({ error: 'Missing or invalid search query' });
          }

        const users = await prisma.user.findMany({
            where: {
              AND: [
                { id: { not: currentUserId } },
                {
                  OR: [
                    { username: { contains: q, mode: 'insensitive' } },
                    { fullName: { contains: q, mode: 'insensitive' } },
                  ]
                }
              ]
            },
            select: {
              id: true,
              fullName: true,
              username: true,
              profilePic: true,
            },
            take: 5,
          });
          res.status(200).json({ users });
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({error: "Error getting users for profileSearch"});
    }
}

export const getUser  = async (req: Request, res: Response): Promise<any> => {
  try {
    const { username } = req.query;
    if (typeof username !== 'string' || username.trim() === '') {
      return res.status(400).json({ error: 'Missing or invalid search query' });
    }

    const userInfo = await prisma.user.findUnique({
      where:{username: username},
      select:{
        id: true,
        username: true,
        fullName: true,
        profileDescription: true,
        profilePic: true,
        publications:{
          orderBy: {createdAt: 'desc'}
        },
        _count:{
          select:{
            follows: true,
            following: true
          }
        }
      }
    })
    if(!userInfo){
      return res.status(401).json({error: "Error"});
    }
    res.status(200).json({userInfo});


  } catch (error: any) {
      console.log(error.message)
      res.status(500).json({error: "Error getting users for profileSearch"});
  }
}