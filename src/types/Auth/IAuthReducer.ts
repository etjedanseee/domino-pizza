import { IUser } from './IAuth';

export interface AuthState {
  user: null | IUser
}

export enum AuthActionTypes {
  SET_USER = 'SET_USER',
}

interface setUser {
  type: AuthActionTypes.SET_USER,
  payload: IUser
}

export type AuthAction = setUser 