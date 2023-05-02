import axios from "axios";
import { getApiKey, getTime } from "./../../api/useApi";
export const actionTypes = {
  FETCH_REPLIED: "FETCH_REPLIED",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_ERROR: "FETCH_ERROR",
};

let nowTime =
  new Date().getHours().toString().padStart(2, "0") +
  ":" +
  new Date().getMinutes().toString().padStart(2, "0");

const apiKey = getApiKey();
export const processToChatGPT = (props) => async (dispatch) => {
  //useApi fonksiyonu bir "hook" olduğu için sadece React bileşenlerinin içinde kullanılabilir.
  console.log("props", props);
  dispatch({
    type: actionTypes.FETCH_SUCCESS,
    payload: props,
  });
  //role özelliği, mesajın kim tarafından gönderildiğini belirtir,
  let apiMessages = []; //let yontemi icin
  let messageRole = {
    role: "",
    content: props.message,
  };
  //apiye giden mesaji belirtir
  if (props.sender === "ChatGPT") {
    //"assistant" ise ChatGPT'den ve "user" ise kullanıcıdan gelir.
    messageRole.role = "assistant";
  } else {
    messageRole.role = "user";
  }
  //api icin gonderilecek rol ve metin
  apiMessages = [...apiMessages, messageRole]; // let apiMessages icin
  //   apiMessages.push(messageRole) const apiMessages icin

  //Bu işlem sonucunda oluşan apiMessages adlı dizi, ChatGPT API'ye gönderilmek üzere hazırlanır.
  console.log("apiMessages", apiMessages);

  //isteğin gövdesi (request body) olarak kullanılacak.
  const apiRequestBody = {
    model: "gpt-3.5-turbo", //özelliği, hangi ChatGPT modelinin kullanılacağını belirler.
    messages: apiMessages /* [
      //ChatGPT ile iletişimde yer alacak mesajların listesidir.
      ...apiMessages, //kullanıcının ChatGPT'ye gönderdiği mesajların listesidir.
    ], */,
  };
  console.log("apiRequestBody", apiRequestBody);

  await axios
    .post("https://api.openai.com/v1/chat/completions", apiRequestBody, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    })
    .then(({ data }) => {
      console.log("datadan", data);
      dispatch({
        type: actionTypes.FETCH_SUCCESS,
        payload: {
          //OpenAI API'dan gelen yanıtın data özelliğindeki choices dizisindeki ilk öğenin message.content özelliğidir.
          message: data.choices[0].message.content, //gelen cevap
          sentTime: getTime(), //gonderilen zaman 01.05.2023 00:22:16 gibi
          //mesajın ChatGPT tarafından gönderildiğini belirtmek için "ChatGPT" olarak ayarlanır
          sender: "ChatGPT",
        },
      });
      dispatch({ type: actionTypes.FETCH_REPLIED });
    })
    .catch((error) => {
      console.error(error);
    });
};
