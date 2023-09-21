const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;
const app = express();
const http = require("http").Server(app);
const path = require("path");
app.use(express.static(__dirname + '/public'));
//!attached http server to the socket.io
const io = require("socket.io")(http);
//?part socket
io.on("connection", (socket) => {
    console.log("A user connected.");
    socket.emit("message", "Welcome to ChatCord");
    //!broadcast when a user connects
    socket.broadcast.emit("message", "A user has joined the chat ");

//!Runs when client disconnects
    socket.on("disconnect", () => {
        console.log("A user left chat")
        io.emit("message", "A user has left the chat")
    });
    //?listen for chat message
    socket.on("chatMessage", (msg) => {
        io.emit("message", msg);
    })
});


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"))
})
http.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
