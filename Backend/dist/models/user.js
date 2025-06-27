"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usermodel = void 0;
const mongoose_1 = require("mongoose");
const userShcema = new mongoose_1.Schema({
    username: { type: String, unique: true },
    password: String,
});
exports.Usermodel = (0, mongoose_1.model)("user", userShcema);
