import { PizzaAction, IPizzaState, PizzaActionTypes } from './../../types/Pizza/IPizzaReducer';

const initialState: IPizzaState = {
  pizzas: [],
  ingredients: [],
  loading: true
}

export const pizzaReducer = (state = initialState, action: PizzaAction): IPizzaState => {
  switch (action.type) {
    case PizzaActionTypes.SET_LOADING: {
      return {
        ...state, loading: action.payload
      }
    }
    case PizzaActionTypes.SET_PIZZAS: {
      return {
        ...state,
        pizzas: action.payload,
        loading: false
      }
    }
    case PizzaActionTypes.SET_INGREDIENTS: {
      return {
        ...state,
        ingredients: action.payload,
        loading: false
      }
    }
    default: return state
  }
}