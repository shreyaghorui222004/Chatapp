import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import { app, server } from "./lib/socket.js";

const PORT = ENV.PORT || 3000;

/* ==============================
   MIDDLEWARE
================================ */

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://chatapp-gray-three.vercel.app",
    ],
    credentials: true,
  })
);

/* ==============================
   ROUTES
================================ */

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

/* ==============================
   START SERVER
================================ */

server.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
  connectDB();
});