import { createStore } from "redux";
import reducerConf from "./reduxConf";
import rootReducer from "./rootReducer";

const store = createStore(rootReducer, reducerConf);

export default store;
