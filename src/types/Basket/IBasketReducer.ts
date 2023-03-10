import { IBasketItem } from './IBasket';

export interface IBasketState {
  items: IBasketItem[],
  count: number,
  totalSum: number
}

export enum BasketActionTypes {
  ADD_ITEM = 'ADD_ITEM',
  DELETE_ITEM = 'DELETE_ITEM',
}

interface addItemToBasket {
  type: BasketActionTypes.ADD_ITEM,
  payload: IBasketItem
}

interface deleteBasketItem {
  type: BasketActionTypes.DELETE_ITEM,
  payload: { id: number, price: number }
}

export type IBasketAction = addItemToBasket | deleteBasketItem
