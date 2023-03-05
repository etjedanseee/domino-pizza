import { IBasketAction, BasketActionTypes } from './../../types/Basket/IBasketReducer';
import { Dispatch } from "redux";
import { IBasketItem } from '../../types/Basket/IBasket';

export const addPizzaToBasket = (item: IBasketItem) => {
  return (dispatch: Dispatch<IBasketAction>) => {
    dispatch({
      type: BasketActionTypes.ADD_ITEM,
      payload: item,
    });
  };
}