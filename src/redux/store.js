import { applyMiddleware, createStore } from "redux";
import { combineReducers } from "redux";
import messageReducer from "./reducers/messageReducer";
import thunk from "redux-thunk";

const rootReduce = combineReducers({
    messageState:messageReducer
})
//applyMiddleware fonksiyonu, Redux Thunk gibi Redux eklentilerini devre dışı bırakmadan uygulamaya farklı türde işlevsellikler eklemeyi sağlayan bir fonksiyondur. Bu örnekte, thunk middleware eklentisi kullanılır.

//createStore fonksiyonu, bir tane ana indirgeme işlevi alır ve Redux depo (store) nesnesini oluşturur
const store = createStore(rootReduce, applyMiddleware(thunk))
//applyMiddleware fonksiyonu kullanılarak, Redux Thunk Middleware'ı store'a eklenir.
//Bu, asenkron işlemlerin Redux üzerinden yönetilmesine olanak tanır.
export default store