import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { alertSlice } from "./alertSlice";


const rootReducer=combineReducers({
    alerts:alertSlice.reducer,
});
export  const store=configureStore({
    reducer:rootReducer,
});
