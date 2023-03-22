import { authReducer } from './authReducer';
import { basketReducer } from './basketReducer';
import { combineReducers } from "redux";
import { pizzaReducer } from "./pizzaReducer";
import { notificationReducer } from "./notificationReducer";


export const rootReducer = combineReducers({
  pizza: pizzaReducer,
  basket: basketReducer,
  auth: authReducer,
  notification: notificationReducer
})

export type RootState = ReturnType<typeof rootReducer>