import { app } from "./app";
import dotenv from "dotenv";
import { connectDB, initializeSocketIO } from "./services";
import cron from "node-cron";
import http from "http";

dotenv.config();

const PORT = process.env.PORT;

const server = http.createServer(app);
export const io = initializeSocketIO(server);

if (process.env.NODE_ENV === "production") {
  cron.schedule("29,30,31,32,33,34,35 8 * * 1-5", () => {
    console.log("Running a task at 8:29 - 8:35 AM from Monday to Friday");
  });
}

connectDB().then(() => {
  io.on("connection", (socket) => {
    console.log("New client connected");
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
