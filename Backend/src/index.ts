import express from "express";
import { Jwt } from "jsonwebtoken";

const app = express();

app.post("/api/v1/signup", (req, res) => {});

app.post("/api/v1/signin", (req, res) => {});
app.post("/api/v1/content", (req, res) => {});
app.get("/api/v1/content", (req, res) => {});
app.delete("/api/v1/signip", (req, res) => {});
app.post("/api/v1/share", (req, res) => {});
app.get("/api/v1/:shareLink", (req, res) => {});