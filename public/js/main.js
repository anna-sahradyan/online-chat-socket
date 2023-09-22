const chatForm = document.querySelector('#chat-form');
const chatMessages = document.querySelector(".section__chatBox");
//!get username and room from URL
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true,

});
const roomName = document.querySelector(".room_name");
const usersList = document.querySelector(".users_list");
const spanElement = roomName.querySelector("span");
socket = io();
//?Join chatroom
socket.emit("joinRoom", {username, room});
//?Get Room and users
socket.on("roomUsers", ({room, users}) => {
    outPutRoomName(room);
    outPutUsers(users);
});

//?Message from server

socket.on("message", (msg) => {
    console.log(msg);
    outPutMessage(msg);
    //?Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});
//?Message submit
chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    //?get message text
    const msg = e.target.elements.msg.value;
    //?Emit message to server
    socket.emit("chatMessage", msg);
    //?clear input
    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();

});

//?outPutMessage to DOM
function outPutMessage(msg) {
    const div = document.createElement("div");
    div.classList.add("outing__msg");
    div.innerHTML = `    
                   <p class="meta">${msg.username}<span>${msg.time}</span></p>
                        <p class="text__msg"><span>${msg.text}</span></p>`;
    document.querySelector(".section__chatBox").appendChild(div);

}

//!Add room name to DOM
function outPutRoomName(room) {
    spanElement.textContent = room;

}

//!Add users to DOM
function outPutUsers(users) {
    usersList.innerHTML = `
    ${users.map(user=>`<Li>${user.username}</Li>`).join("")}
    `;

}

document.addEventListener('DOMContentLoaded', function () {

    document.querySelector('.chat__leave').addEventListener('click', () => {
        const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
        if (leaveRoom) {
            window.location = '../index.html';
        } else {

        }
    });
});




