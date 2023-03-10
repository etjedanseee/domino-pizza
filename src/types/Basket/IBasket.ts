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