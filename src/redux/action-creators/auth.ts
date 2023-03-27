import { supabase } from './../../supabaseClient';
import { Dispatch } from 'redux';
import { AuthAction, AuthActionTypes } from './../../types/Auth/IAuthReducer';
import { IUser } from './../../types/Auth/IAuth';


export const setUser = (user: IUser | null) => {
  return (dispatch: Dispatch<AuthAction>) => {
    dispatch({
      type: AuthActionTypes.SET_USER,
      payload: user
    })
  }
}

export const getUserOrders = () => {
  return async (dispatch: Dispatch<AuthAction>) => {
    try {
      const { data, error } = await supabase
        .from('Orders')
        .select('*')

      if (error) {
        throw new Error(error.message)
      }

      dispatch({
        type: AuthActionTypes.GET_ORDERS,
        payload: data || []
      })
      console.log('user orders', data)
    } catch (e) {
      console.log('Get User Orders error', e)
    }
  };
};

export const clearUserOrders = () => {
  return (dispatch: Dispatch<AuthAction>) => {
    dispatch({ type: AuthActionTypes.CLEAR_ORDERS })
  }
}