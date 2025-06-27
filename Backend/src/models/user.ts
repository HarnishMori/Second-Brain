import mongoose, { Schema, model } from "mongoose";
import { Iuser } from "../types/user";

const userShcema = new Schema<Iuser>({
  username: { type: String, unique: true, required: true },
  password: String,
});

export const Usermodel = model('User', userShcema);

const linkSchema = new Schema({
  hash: String,
  userId: { type: mongoose.Types.ObjectId, ref: Usermodel, required: true, unique:true },
});

export const Linkmodel = model("Link", linkSchema);
