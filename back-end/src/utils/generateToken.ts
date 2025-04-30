import jwt from 'jsonwebtoken'
import {Response} from 'express'

const generateToken = (userId: string, res: Response) => {

    const token = jwt.sign({userId}, process.env.JWT_SECRET!, {expiresIn: "15d"})
    res.cookie("jwt", token, {
        maxAge: 15*24*60*60*1000,//ms 
        httpOnly: true, //prevents XSS
        sameSite: "strict", //prevents csrf
        secure: process.env.NODE_ENV !== "development"//https
    });

    return token;
}

export default generateToken;