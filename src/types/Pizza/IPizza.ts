export interface IPizza {
  id: number,
  name: string,
  sizes: number[],
  sizesPrice: number[],
  dough: string[],
  ingredients: string[],
  image: string
}

export interface IIngredient {
  name: string,
  price: number,
  count: number,
}

export type sortPizzasByType = 'По умолчанию' | 'От дешевых' | 'От дорогих'
