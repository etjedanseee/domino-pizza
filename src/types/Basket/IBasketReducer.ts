import { IBasketItem, IOrder } from './IBasket';

export interface IBasketState {
  items: IBasketItem[],
  count: number,
  deliveryPrice: number,
  totalSum: number
}

export enum BasketActionTypes {
  ADD_ITEM = 'ADD_ITEM',
  DELETE_ITEM = 'DELETE_ITEM',
  CLEAR_ITEMS = 'CLEAR_ITEMS',
  SET_BASKET_ITEMS = 'SET_BASKET_ITEMS',
  CHANGE_DELIVERY_ADRESS = 'CHANGE_DELIVERY_ADRESS',
  GET_USER_ORDERS = 'GET_USER_ORDERS',
  CHECKOUT_ORDER = 'CHECKOUT_ORDER'
}

interface addItemToBasket {
  type: BasketActionTypes.ADD_ITEM,
  payload: IBasketItem
}

interface deleteBasketItem {
  type: BasketActionTypes.DELETE_ITEM,
  payload: { id: number, price: number }
}

interface clearItems {
  type: BasketActionTypes.CLEAR_ITEMS,
}

interface setBasketItems {
  type: BasketActionTypes.SET_BASKET_ITEMS,
  payload: IBasketItem[]
}

interface changeDeliveryAdress {
  type: BasketActionTypes.CHANGE_DELIVERY_ADRESS,
  payload: number
}

interface getUserOrders {
  type: BasketActionTypes.GET_USER_ORDERS,
  payload: number
}

interface checkoutOrder {
  type: BasketActionTypes.CHECKOUT_ORDER,
  payload: IOrder
}

export type IBasketAction = addItemToBasket | deleteBasketItem | clearItems | changeDeliveryAdress | getUserOrders | checkoutOrder | setBasketItems
