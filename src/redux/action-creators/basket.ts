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

export const decrementBasketItem = (id: number, price: number) => {
  return (dispatch: Dispatch<IBasketAction>) => {
    dispatch({
      type: BasketActionTypes.DELETE_ITEM,
      payload: { id, price }
    })
  }
}

export const changeDeliveryAdress = (currentDeliveryPrice: number) => {
  return (dispatch: Dispatch<IBasketAction>) => {
    dispatch({
      type: BasketActionTypes.CHANGE_DELIVERY_ADRESS,
      payload: currentDeliveryPrice
    })
  }
}