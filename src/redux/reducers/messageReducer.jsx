import { actionTypes } from "../action/action";

const initialState = {
  isTyping: false,
  message: [
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now", //gonderilen zaman
      sender: "ChatGPT", //gonderen
    },
  ],
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SUCCESS:
      console.log("MESSAGEYE EKLENECEK OLAN", action);
      return {
        isTyping: true,
        message: [...state.message, action.payload],
      };
    case actionTypes.FETCH_REPLIED:
      return{
        ...state,
        isTyping: false,
      }
    default:
      return state;
  }
};

export default messageReducer;
