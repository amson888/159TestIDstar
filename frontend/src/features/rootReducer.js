import { combineReducers } from "@reduxjs/toolkit";
import contactReducer from "./contact/contactSlice";

const rootReducers = {
  contact: contactReducer
}

export default combineReducers(rootReducers);

