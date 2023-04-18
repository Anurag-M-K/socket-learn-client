import React, { useEffect, useState } from "react";
import './App.css'

function Chat({ socket, username, room }) {
  console.log("socket ",socket)
  console.log("usename ",username)
  console.log("room ",room)
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList ,setMessgeList ] = useState([])


  //sending messages to socket server
  const sendMessage =async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message",messageData);
    }
  };

  useEffect(()=>{
    socket.on("recieve_message",(data) =>{
      setMessgeList((list)=>[...list,data]) //adding messages to prev messages
      console.log(("data ",data))
    })
    return () => {
      socket.off("recieve_message");
    };
  },[`socket`])

  console.log('messaagelsit ',messageList)

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        {messageList?.map((messageContent,i)=>{
          return <h1 key={i}>{messageContent?.message}</h1>
        })}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="type..."
          onChange={(event) => setCurrentMessage(event.target.value)}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
