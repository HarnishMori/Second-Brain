import mongoose, { Schema, model } from "mongoose";
import { Usermodel } from "./user";

const ContentSchema = new Schema({
  title: String,
  link: String,
  tags: [{ type: mongoose.Types.ObjectId, ref:'Tag' }],
  userId: { type: mongoose.Types.ObjectId, ref: Usermodel },
});

export const ContentModel = model("Content", ContentSchema);
