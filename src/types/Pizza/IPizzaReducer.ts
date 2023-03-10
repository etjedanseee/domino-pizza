import { IPizza, IIngredient } from './IPizza';

export interface IPizzaState {
  loading: boolean,
  pizzas: IPizza[],
  ingredients: IIngredient[]
}

export enum PizzaActionTypes {
  SET_LOADING = 'SET_LOADING',
  SET_PIZZAS = 'SET_PIZZAS',
  SET_INGREDIENTS = 'SET_INGREDIENTS',
}

interface setLoading {
  type: PizzaActionTypes.SET_LOADING,
  payload: boolean
}

interface setPizzas {
  type: PizzaActionTypes.SET_PIZZAS,
  payload: IPizza[]
}

interface setIngredients {
  type: PizzaActionTypes.SET_INGREDIENTS,
  payload: IIngredient[]
}


export type PizzaAction = setLoading | setIngredients | setPizzas