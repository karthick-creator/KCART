import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import productsReducers from "./slices/productsSlice";

const reducer = combineReducers({
    productsState: productsReducers                                                 //error state didn't comes in redux payload
})

const store = configureStore ({
    reducer,
    middleware: () => [thunk]
})

export default store;