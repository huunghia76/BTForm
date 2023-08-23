import { combineReducers } from "redux";
import { BTFormReducer } from "./formStudent/slice";

export const rootReducer = combineReducers({
    BTFormStudent:BTFormReducer
})