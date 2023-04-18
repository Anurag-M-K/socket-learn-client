import React, { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";
import './App.css'

//establish connection
const socket = io.connect("https://socket-learn-server.onrender.com");
//there are no http requests are sending to backend in socket io , 

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if(username !=="" && room !==""){
      socket.emit("join_room",room) //emiting events and room to the socket server 
    setShowChat(true)
    }
  };

  return (
    <div className="App">
      {!showChat ? (
      <div className="jointChatContainer">

      <h3>Join a chat</h3>
      <input
        type="text"
        placeholder="name"
        onChange={(e) => setUsername(e.target.value)}
        />
      <input
        type="text"
        placeholder="room id..."
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={joinRoom}> Join a room</button>
        </div>
        )  : (
      <Chat socket={socket} username={username} room={room}/>
        )}
    </div>
  );
}

export default App;
