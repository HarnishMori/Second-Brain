import { Schema, model } from "mongoose";
import { Iuser } from "../types/user";

const userShcema = new Schema<Iuser>({
  username: { type: String, unique: true },
  password: String,
});

export const Usermodel = model("user", userShcema);
