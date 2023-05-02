import React, { useEffect } from "react";

const View = ({ message, key }) => {
    //Gelen metni scrooll ile en altta odaklanma
    useEffect(() => {
      //Gelen metni scrooll ile en altta odaklanma
      const messageBox = document.querySelector(".chat-screen");
      if (messageBox !== null) {
        messageBox.scrollTop = messageBox.scrollHeight; //scroolHeight ile esitleyerek
      } else {
        console.log("screen1 element not found");
      }
    }, []); 
  
  
  return (
    <div
      key={key}
      className={`reply ${message.sender === "ChatGPT" ? "chatgpt" : "user"}`}
    >
      {/* {message.sender === "ChatGPT" && <div>ChatGPT:</div>} */}
      <div className="gpt">
        {message.message}
      </div>
        <span className="date">{message.sentTime}</span>
    </div>
  );
};

export default View;
