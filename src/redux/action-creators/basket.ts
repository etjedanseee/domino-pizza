import { supabase } from './../../supabaseClient';
import { IBasketAction, BasketActionTypes } from './../../types/Basket/IBasketReducer';
import { Dispatch } from "redux";
import { IBasketItem, IOrder } from '../../types/Basket/IBasket';

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

export const getUserOrders = () => {
  return async (dispatch: Dispatch<IBasketAction>) => {
    const d = await supabase
      .from('Orders')
      .select('*')

    console.log('user orders', d)
  };
};

export const checkoutOrder = (order: IOrder) => {
  return async (dispatch: Dispatch<IBasketAction>) => {
    try {
      const { data, error } = await supabase
        .from('Orders')
        .insert(order)

      if (error) {
        throw new Error(error.message)
      }

      console.log('insert order', data, error)
      dispatch({ type: BasketActionTypes.CLEAR_ITEMS })
    } catch (e) {
      console.log('CHECKOUT ERROR', e)
    }
  };
};