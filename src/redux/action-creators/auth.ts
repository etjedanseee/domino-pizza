import { Dispatch } from 'redux';
import { AuthAction, AuthActionTypes } from './../../types/Auth/IAuthReducer';
import { IUser } from './../../types/Auth/IAuth';


export const setUser = (user: IUser) => {
  return (dispatch: Dispatch<AuthAction>) => {
    dispatch({
      type: AuthActionTypes.SET_USER,
      payload: user
    })
  }
}