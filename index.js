const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;
const app = express();
const formatMessage = require("./utils/messages");
const http = require("http").Server(app);
const path = require("path");
const {userJoin, getCurrentUser, getRoomUsers, userLeave} = require("./utils/users");
app.use(express.static(__dirname + '/public'));
//!attached http server to the socket.io
const io = require("socket.io")(http);
const botName = "ChatCord Bot";
//?part socket
//!Run when client connect
io.on("connection", (socket) => {
    socket.on("joinRoom", ({username, room}) => {
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);
        //!Welcome current user
        socket.emit("message", formatMessage(botName, "Welcome to ChatCord !"));

        //!broadcast when a user connects
        socket.broadcast
            .to(user.room)
            .emit("message", formatMessage(botName, `${user.username} has joined the chat `));
        io.to(user.room).emit("roomUsers", {
            room: user.room,
            users: getRoomUsers(user.room)
        });

    });
    //!listen for chat message
    socket.on("chatMessage", (msg) => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit("message", formatMessage(user.username, msg));
    });

//!Runs when client disconnects
    socket.on("disconnect", () => {
        const user = userLeave(socket.id);
        if (user) {
            io.to(user.room).emit("message", formatMessage(botName, `${user.username} has left the chat`));
//!send users and room info

            io.to().emit("roomUser", {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    });
});


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"))
})
http.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
