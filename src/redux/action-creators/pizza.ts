import { supabase } from './../../supabaseClient';
import { PizzaAction, PizzaActionTypes } from './../../types/Pizza/IPizzaReducer';
import { Dispatch } from "react"

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