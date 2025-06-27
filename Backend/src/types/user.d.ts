import { Document } from "mongoose";
import { Request } from "express";

export interface Iuser extends Document {
  username: string;
  password: string;
}

export interface AuthRequest extends Request {
  userId?: string;
}
