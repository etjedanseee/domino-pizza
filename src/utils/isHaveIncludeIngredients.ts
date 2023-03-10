import { IIngredient } from "../types/Pizza/IPizza";

export const isHaveIncludeIngredients = (ingredients: IIngredient[], addedIngr: IIngredient[]) => {
  for (let ingr of addedIngr) {
    if ((ingredients.find(i => i.name === ingr.name)?.count || 0) < ingr.count) {
      return false
    }
  }
  return true
}