import express from "express";
import cors from "cors";
import prisma from "../prisma/db";
import routes from "./routes";
import { Server } from "socket.io";
import http from "http";

require("dotenv").config();

const app = express();

const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(routes);

const shutdown = () => {
  prisma.$disconnect();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

async function connectToDatabase() {
  try {
    await prisma.$connect();
    console.log("Connected to MySQL database ✅ : (3306 default)");
  } catch (error) {
    console.error("Failed to connect to MySQL database:", error);
    process.exit(1);
  }
}

connectToDatabase();

const PORT = process.env.PORT || 3334;
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT} 🚀`);
});
