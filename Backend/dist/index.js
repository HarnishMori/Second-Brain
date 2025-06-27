"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("./models/user");
const db_1 = require("./config/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const inspector_1 = require("inspector");
const auth_1 = require("./middlewares/auth");
const content_1 = require("./models/content");
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10");
(0, db_1.connectDB)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // add zod validation
    try {
        const { username, password } = req.body;
        const hashedPass = yield bcrypt_1.default.hash(password, saltRounds);
        const user = yield user_1.Usermodel.create({
            username: username,
            password: hashedPass,
        });
        res.json({
            message: "user created succesfully",
            userid: user._id,
        });
    }
    catch (error) {
        inspector_1.console.error("error creating user", error);
        res.json({
            message: "something went wrong while creating the user",
            erorr: error.message,
        });
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield user_1.Usermodel.findOne({ username });
    if (user) {
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (isMatch) {
            const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET);
            res.json(token);
        }
        else {
            res.status(403).json({
                message: "Invalid credentials",
            });
        }
    }
    else {
        res.status(404).json({
            message: "user not found",
        });
    }
}));
app.post("/api/v1/content", auth_1.userAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { link, type } = req.body;
    try {
        yield content_1.ContentModel.create({
            link,
            type,
            userId: req.userId,
            tag: [],
        });
        res.json({
            message: " content added",
        });
    }
    catch (e) {
        inspector_1.console.error("error creating content", e);
        res.json({
            message: "content not added",
            error: e.message,
        });
    }
}));
app.get("/api/v1/content", auth_1.userAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const content = yield content_1.ContentModel.find({
            userId: userId,
        }).populate("userId", "username");
        res.json({
            content: content,
        });
    }
    catch (e) {
        inspector_1.console.error("error findind content", e);
        res.status(404).json({
            message: "content not found",
            error: e.message,
        });
    }
}));
app.delete("/api/v1/content", auth_1.userAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentId } = req.body;
    try {
        yield content_1.ContentModel.deleteOne({
            _id: contentId,
            userId: req.userId,
        });
        res.json({
            message: "Deleted",
        });
    }
    catch (e) {
        inspector_1.console.error("not deleted", e);
        res.json({
            message: "Not deleted"
        });
    }
}));
app.post("/api/v1/share", (req, res) => { });
app.get("/api/v1/:shareLink", (req, res) => { });
app.listen(PORT, () => {
    inspector_1.console.log(`server running on ${PORT}`);
});
