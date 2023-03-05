import { IIngredient } from './../Pizza/IPizza';

export interface IBasketItem {
  name: string,
  size: number,
  dough: string,
  ingredients: string[],
  addedIngredients: IIngredient[],
  totalPrice: number
}
