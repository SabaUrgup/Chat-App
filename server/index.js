const express = require("express");
const app = express();
//allows data transfer between server and client domains
const http = require("http").Server(app);
const cors = require("cors");
const PORT = 4000;
//create a real-time connection
const socketIO = require("socket.io")(http, {
	cors: {
		origin: "http://localhost:3000",
	},
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//Id's for chatRooms
const generateID = () => Math.random().toString(36).substring(2, 10);
let chatRooms = [];

socketIO.on("connection", (socket) => {
	console.log(`⚡: ${socket.id} user just connected!`);

	socket.on("createRoom", (name) => {
		socket.join(name);
		chatRooms.unshift({ id: generateID(), name, messages: [] });
		socket.emit("roomsList", chatRooms);
	});

	socket.on("findRoom", (id) => {
		let result = chatRooms.filter((room) => room.id == id);
		// console.log(chatRooms);
		socket.emit("foundRoom", result[0].messages);
		// console.log("Messages Form", result[0].messages);
	});

	//Listen to the event on the server and update the chatRoom array.
	socket.on("newMessage", (data) => {
		//👇🏻 Destructures the property from the object
		const { room_id, subject, message, user, timestamp } = data;
		//👇🏻 Finds the room where the message was sent
		let result = chatRooms.filter((room) => room.id == room_id);
		//👇🏻 Create the data structure for the message
		const newMessage = {
			id: generateID(),
			subject: subject,
			text: message,
			user,
			time: `${timestamp.hour}:${timestamp.mins}`,
		};

    //👇🏻 Updates the chatroom messages
		console.log("New Message", newMessage);
		socket.to(result[0].name).emit("roomMessage", newMessage);
		result[0].messages.push(newMessage);

		socket.emit("roomsList", chatRooms);
		socket.emit("foundRoom", result[0].messages);
	});
	socket.on("disconnect", () => {
		socket.disconnect();
		console.log("🔥: A user disconnected");
	});
});

//Also, return the chat room list via the API route as below:
app.get("/api", (req, res) => {
	res.json(chatRooms);
});

http.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
