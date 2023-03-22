import { IUserData } from '../Auth/IAuth';
import { IIngredient } from './../Pizza/IPizza';

export interface IBasketItem {
  id: number,
  name: string,
  image: string,
  size: number,
  dough: string,
  ingredients: string[],
  addedIngredients: IIngredient[],
  totalPrice: number,
}

export interface IBasketSortedItem {
  item: IBasketItem,
  count: number,
  allSum: number,
}

export interface IOrder {
  contacts: IUserData,
  adress: string,
  basket: IBasketItem[],
  totalSum: number,
  date: Date
}