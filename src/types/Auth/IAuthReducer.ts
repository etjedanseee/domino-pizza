import { IUser, IUserOrder } from './IAuth';

export interface AuthState {
  user: IUser | null,
  userOrders: IUserOrder[]
}

export enum AuthActionTypes {
  SET_USER = 'SET_USER',
  GET_ORDERS = 'GET_ORDERS',
  CLEAR_ORDERS = 'CLEAR_ORDERS'
}

interface setUser {
  type: AuthActionTypes.SET_USER,
  payload: IUser | null
}

interface getOrders {
  type: AuthActionTypes.GET_ORDERS,
  payload: IUserOrder[]
}

interface clearOrders {
  type: AuthActionTypes.CLEAR_ORDERS,
}

export type AuthAction = setUser | getOrders | clearOrders