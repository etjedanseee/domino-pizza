import { IBasketItem } from './IBasket';

export interface IBasketState {
  items: IBasketItem[],
  count: number,
  deliveryPrice: number,
  totalSum: number
}

export enum BasketActionTypes {
  ADD_ITEM = 'ADD_ITEM',
  DELETE_ITEM = 'DELETE_ITEM',
  CHANGE_DELIVERY_ADRESS = 'CHANGE_DELIVERY_ADRESS'
}

interface addItemToBasket {
  type: BasketActionTypes.ADD_ITEM,
  payload: IBasketItem
}

interface deleteBasketItem {
  type: BasketActionTypes.DELETE_ITEM,
  payload: { id: number, price: number }
}

interface changeDeliveryAdress {
  type: BasketActionTypes.CHANGE_DELIVERY_ADRESS,
  payload: number
}

export type IBasketAction = addItemToBasket | deleteBasketItem | changeDeliveryAdress
