import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;

/* ===============================
   MIDDLEWARE
================================ */

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

/* ===============================
   API ROUTES
================================ */

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

/* ===============================
   SERVE FRONTEND BUILD (MONOLITHIC)
================================ */

// Serve static files
app.use(express.static(path.join(__dirname, "frontend/dist")));

// React routing support
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist/index.html"));
});

/* ===============================
   START SERVER
================================ */

server.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
  connectDB();
});