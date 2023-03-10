import { supabase } from './../../supabaseClient';
import { PizzaAction, PizzaActionTypes } from './../../types/Pizza/IPizzaReducer';
import { Dispatch } from "react"
import { IIngredient } from '../../types/Pizza/IPizza';

export const fetchPizzas = () => {
  return async (dispatch: Dispatch<PizzaAction>) => {
    dispatch({
      type: PizzaActionTypes.SET_LOADING,
      payload: true,
    });
    const { data } = await supabase.from('Pizza').select('*')
    dispatch({
      type: PizzaActionTypes.SET_PIZZAS,
      payload: data || []
    });
  };
};

export const fetchIngredients = () => {
  return async (dispatch: Dispatch<PizzaAction>) => {
    dispatch({
      type: PizzaActionTypes.SET_LOADING,
      payload: true,
    });
    const { data } = await supabase.from('AdditionalIngredients').select('*')
    dispatch({
      type: PizzaActionTypes.SET_INGREDIENTS,
      payload: data || []
    });
  };
}

//if increaseOrDecrease is true - increase ingredients, else decrease ingredients
export const updateIngredients = (ingredients: IIngredient[], addedIngr: IIngredient[], increaseOrDecrease: boolean) => {
  const resArr: IIngredient[] = []
  for (let ing of addedIngr) {
    const current = ingredients.find(i => i.name === ing.name) || ingredients[0]
    resArr.push({
      name: ing.name,
      count: increaseOrDecrease ? current.count + ing.count : current.count - ing.count,
      price: ing.price
    })
  }
  return async (dispatch: Dispatch<PizzaAction>) => {
    const d = await supabase
      .from('AdditionalIngredients')
      .upsert(resArr)

    const { data } = await supabase.from('AdditionalIngredients').select('*')
    dispatch({
      type: PizzaActionTypes.SET_INGREDIENTS,
      payload: data || []
    });
  };
}