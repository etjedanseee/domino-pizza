import { basketReducer } from './basketReducer';
import { combineReducers } from "redux";
import { pizzaReducer } from "./pizzaReducer";


export const rootReducer = combineReducers({
  pizza: pizzaReducer,
  basket: basketReducer
})

export type RootState = ReturnType<typeof rootReducer>