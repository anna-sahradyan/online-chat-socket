const chatForm = document.querySelector('#chat-form');
const chatMessages = document.querySelector(".section__chatBox");

socket = io();
//?Message from server

socket.on("message", (msg) => {
    console.log({ msg });
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
    console.log({msg})

});

//?outPutMessage to DOM
function outPutMessage(msg) {
    const div = document.createElement("div");
    div.classList.add("outing__msg");
    div.innerHTML = `    
                   <p class="meta"> users2 <span>9:12</span></p>
                        <p class="text__msg"><span>${msg}</span></p>`;
    document.querySelector(".section__chatBox").appendChild(div);

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




