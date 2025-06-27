import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/user";


export const userAuth = (req:AuthRequest, res:Response, next:NextFunction)=>{

    const header = req.headers["authorization"];
    const decoded = jwt.verify(header as string, process.env.JWT_SECRET!) as {id: string};

    if(decoded){
        req.userId = decoded.id;
        next();
    }else{
        res.status(403).json({
            message: "You are not logged In"
        })
    }
}