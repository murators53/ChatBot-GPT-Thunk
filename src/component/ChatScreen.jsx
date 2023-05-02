import React from "react";

const ChatScreen = ({ message, key }) => {
  return (
    <div key={key}>
      {message.sender === "ChatGPT" && <div>ChatGPT:</div>}
      <div>{message.message}</div>
    </div>
  );
};

export default ChatScreen;
