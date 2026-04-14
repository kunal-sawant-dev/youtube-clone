import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import path from "path";
import http from "http";
import { fileURLToPath } from "url";


import userroutes from "./routes/auth.js";
import videoroutes from "./routes/video.js";
import likeroutes from "./routes/like.js";
import watchlaterroutes from "./routes/watchlater.js";
import historyrroutes from "./routes/history.js";
import commentroutes from "./routes/comment.js";
import downloadRoutes from "./routes/download.js";
import paymentRoutes from "./routes/payment.js";

import initSocket from "./socket.js";

dotenv.config();

const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors());
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json());


app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/user", userroutes);
app.use("/video", videoroutes);
app.use("/like", likeroutes);
app.use("/watch", watchlaterroutes);
app.use("/history", historyrroutes);
app.use("/comment", commentroutes);


app.use("/api/download", downloadRoutes);
app.use("/api/payment", paymentRoutes);


app.get("/", (req, res) => {
  res.send("YouTube backend is working");
});


const PORT = process.env.PORT || 5000;
const server = http.createServer(app);


initSocket(server);

server.listen(PORT, () => {
  console.log(`Server + Socket.IO running on port ${PORT}`);
});


const DBURL = process.env.DB_URL;

mongoose
  .connect(DBURL)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));