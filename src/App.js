import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { processToChatGPT } from "./redux/action/action";
import View from "./component/View";
import { getTime } from "./api/useApi";

function App() {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const messageRepo = useSelector((state) => state.messageState.message);
  const { isTyping } = useSelector((state) => state.messageState);
  console.log("messageRepo", messageRepo);
  // uygulama yüklendiğinde, bir varsayılan mesajı gösterilecektir.

  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now", //gonderilen zaman
      sender: "ChatGPT", //gonderen
    },
  ]);

  const handleSend = async (e) => {
    //gonderilecek mesaj
    e.preventDefault()
    let message= inputRef.current.value;
    const newMessage = {
      message,
      sentTime: getTime(), //gonderilen zaman 01.05.2023 00:22:16 gibi
      sender: "user", //pcden sorulan soru
    };

    dispatch(processToChatGPT(newMessage));

    inputRef.current.value = "";
  };

  return (
    <>
      <h1>ChatBot</h1>
      <div className="chat">
        <div className="chat-screen">
          {messageRepo.map((message, i) => (
            <View message={message} key={i} />
          ))}
        </div>
        <p className="chat-typing">{isTyping && <div>ChatGPT is typing...</div>}</p>
        <form className="chat-send" onSubmit={handleSend}>
          <input type="text" ref={inputRef} placeholder="Bir soru sor?" />
          <button type="submit"
            disabled={isTyping}
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </form>
        
      </div>
    </>
  );
}

export default App;
