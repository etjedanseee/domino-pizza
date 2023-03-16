import { authReducer } from './authReducer';
import { basketReducer } from './basketReducer';
import { combineReducers } from "redux";
import { pizzaReducer } from "./pizzaReducer";


export const rootReducer = combineReducers({
  pizza: pizzaReducer,
  basket: basketReducer,
  auth: authReducer
})

export type RootState = ReturnType<typeof rootReducer>