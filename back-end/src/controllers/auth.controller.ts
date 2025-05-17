import prisma from "../db/prisma.js";
import {Request, Response} from "express";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generateToken.js";


export const signup = async (req: Request, res: Response): Promise<any> => {
    try {
        const {fullName, username, password, confirmPassword, gender} = req.body;
        if(!fullName || !username || !password || !confirmPassword || !gender){
            return res.status(400).json({error: "Please fill in all fields!"})
        }
        if(password !== confirmPassword){
            return res.status(400).json({error: "Passwords do not match!"})
        }

        const user = await prisma.user.findUnique({where:{username}})
        if(user){
            return res.status(400).json({error: "Username already taken!"});
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const pPic = `https://api.dicebear.com/9.x/adventurer/svg?seed=${username}`
        
        const newUser = await prisma.user.create({
            data: {
                fullName,
                username,
                password: hashedPassword,
                gender,
                profilePic : pPic,
                profileDescription: ""
            }
        })

        if(newUser){
            generateToken(newUser.id, res)

            const createdUser = await prisma.user.findUnique({
                where: { id: newUser.id },
                include: {
                  follows: true,
                  following: true,
                },
              });

              if(createdUser){

                  res.status(201).json({
                      id: createdUser.id,
                      fullName: createdUser.fullName,
                      username: createdUser.username,
                      profilePic: createdUser.profilePic,
                      profileDescription: createdUser.profileDescription,
                      follows: createdUser.follows,
                      following: createdUser.following
                    })
            }
        }else{
            return res.status(400).json({error: "Invalid user data"})
        }
    } catch (error : any) {
        console.log("Error creating user!", error.message);
        res.status(500).json({error: "Error creating user!"});
    }
};

export const login = async(req: Request, res: Response): Promise<any> => {

    try {
        const {username, password} = req.body;

        if(!username || !password){
            return res.status(400).json({error: "Fill in all fields!"});
        }

        const user =  await prisma.user.findUnique({where: {username},
        include:{
            follows: true,
            following: true,
        }});
        if(!user){
            return res.status(400).json({error: "Invalid credentials!"});
        }

        const isPasswordCorrect = await bcryptjs.compare(password, user.password);

        if(!isPasswordCorrect){
            return res.status(400).json({error: "Invalid password!"})
        }

        generateToken(user.id, res);

        res.status(200).json({
            id: user.id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
            profileDescription: user.profileDescription,
            follows: user.follows,
            following: user.following
        })
    } catch (error: any) {
        console.log("Error logging in!", error.message);
        res.status(500).json({error: "Error logging in!"});
    }

}

export const logout = async(req: Request, res: Response): Promise<any> => {
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({message: "Logged out succesfully"});
    } catch (error: any) {
        console.log("Error logging out!");
        res.status(500).json({error: "Internal server error"});
    }
}

export const getme = async(req: Request, res: Response): Promise<any> =>{
    try {
        const user = await prisma.user.findUnique({where: {id: req.user.id},
        include:{
            follows: true,
            following: true
        }});
        if(!user){
            return res.status(404).json({error: "User not found"});
        }
        res.status(200).json({
            id: user.id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
            profileDescription: user.profileDescription,
            follows: user.follows,
            following: user.following

        })
    } catch (error) {
        console.log("Error in getMe controller!");
        res.status(500).json({error: "Internal server error"})
    }
}