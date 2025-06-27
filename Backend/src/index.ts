import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Usermodel } from "./models/user";
import { connectDB } from "./config/db";
import bcrypt from "bcrypt";
import { AuthRequest, Iuser } from "./types/user";
import { console } from "inspector";
import { userAuth } from "./middlewares/auth";
import { ContentModel } from "./models/content";

dotenv.config();

const PORT = process.env.PORT || 5000;
const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10");
connectDB();
const app = express();
app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
  // add zod validation
  try {
    const { username, password } = req.body;
    const hashedPass = await bcrypt.hash(password, saltRounds);
    const user = await Usermodel.create({
      username: username,
      password: hashedPass,
    });

    res.json({
      message: "user created succesfully",
      userid: user._id,
    });
  } catch (error) {
    console.error("error creating user", error);
    res.json({
      message: "something went wrong while creating the user",
      erorr: (error as Error).message,
    });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const { username, password } = req.body;
  const user = await Usermodel.findOne({ username });
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
      res.json(token);
    } else {
      res.status(403).json({
        message: "Invalid credentials",
      });
    }
  } else {
    res.status(404).json({
      message: "user not found",
    });
  }
});

app.post("/api/v1/content", userAuth, async (req: AuthRequest, res) => {
  const { link, type } = req.body;
  try {
    await ContentModel.create({
      link,
      type,
      userId: req.userId,
      tag: [],
    });
    res.json({
      message: " content added",
    });
  } catch (e) {
    console.error("error creating content", e);
    res.json({
      message: "content not added",
      error: (e as Error).message,
    });
  }
});
app.get("/api/v1/content", userAuth, async (req: AuthRequest, res) => {
  const userId = req.userId;
  try {
    const content = await ContentModel.find({
      userId: userId,
    }).populate("userId", "username");

    res.json({
      content: content,
    });
  } catch (e) {
    console.error("error findind content", e);
    res.status(404).json({
      message: "content not found",
      error: (e as Error).message,
    });
  }
});
app.delete("/api/v1/content", userAuth, async (req: AuthRequest, res) => {
  const { contentId } = req.body;
  try{
    await ContentModel.deleteOne({
    _id: contentId,
    userId: req.userId,
  });
  res.json({
    message: "Deleted",
  });}catch(e){
    console.error("not deleted", e)
    res.json({
        message: "Not deleted"
    })
  }
})
app.post("/api/v1/share", (req, res) => {});
app.get("/api/v1/:shareLink", (req, res) => {});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
