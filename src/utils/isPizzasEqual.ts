import { IBasketItem } from './../types/Basket/IBasket';

export const isPizzasEqual = (p1: IBasketItem & GenericObject, p2: IBasketItem & GenericObject): boolean => {
  for (let key in p1) {
    if (Array.isArray(p1[key]) && typeof p1[key][0] !== 'object') {
      if (!isArraysEqual(p1[key], p2[key])) {
        return false
      }
    } else if (p1[key] !== p2[key] && typeof p1[key][0] !== 'object') {
      return false
    }
  }
  if (!isAddedIngredientsEqual(p1.addedIngredients, p2.addedIngredients)) {
    return false
  }

  return true
}

const isArraysEqual = <T>(arr1: T[], arr2: T[]): boolean => {
  if (arr1.length !== arr2.length) {
    return false
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false
    }
  }

  return true
}

const isAddedIngredientsEqual = (arr1: addedIngredient[], arr2: addedIngredient[]): boolean => {
  if (arr1.length !== arr2.length) {
    return false
  }
  const sortA1 = arr1.sort((a, b) => a.name.localeCompare(b.name))
  const sortA2 = arr2.sort((a, b) => a.name.localeCompare(b.name))

  for (let i = 0; i < sortA1.length; i++) {
    if ((sortA1[i].name !== sortA2[i].name) || (sortA1[i].count !== sortA2[i].count)) {
      return false
    }
  }

  return true
}

interface addedIngredient {
  name: string,
  count: number,
  price: number
}

interface GenericObject {
  [key: string]: any,
}