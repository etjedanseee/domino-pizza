import { IIngredient } from './../types/Pizza/IPizza';

export const calcAddedIngredients = (addedIngr: IIngredient[]) => {
  let sum = 0;
  for (let i = 0; i < addedIngr.length; i++) {
    sum += addedIngr[i].count * addedIngr[i].price
  }
  return sum
}