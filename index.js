import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import path from "node:path";
import cors from "cors";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(cors({
    
    origin: "http://127.0.0.1:5500/user2/user2.html?",
}));
const PORT=5000;

const __dirname = path.resolve();

app.get("/", (req, res) => {
    res.sendFile("index.html" , {root: __dirname});
})


io.on("connection", (socket) => {
  console.log(socket.id);
    
     socket.on("message", (msg,user) => {
        io.emit("message",user+" : "+msg);    
        console.log(msg,user);
     })


})

httpServer.listen(PORT, () => {
    console.log("http://localhost:" + PORT);
})