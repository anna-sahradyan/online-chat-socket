const socket = io();
socket.on("message", (msg) => {
    console.log({msg});
})
// let btn = document.querySelector(".btnSubmit");
// btn.addEventListener("click", (e) => {
//     e.preventDefault();
//     socket.emit("message", "Hey From Client")
// });
document.getElementById('leave-btn').addEventListener('click', () => {
    const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
    if (leaveRoom) {
        window.location = '../index.html';
    } else {
    }
});




