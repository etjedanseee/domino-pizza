import { IAdress, IBasketItem } from './../Basket/IBasket';

export interface IUser {
  id: string,
  data: IConfirmedUser
}

export type IUserData = IConfirmedUser | IAnonUser

export interface IAnonUser {
  name: string,
  phone: string
}

export interface IConfirmedUser extends IAnonUser {
  email: string,
}

export interface IUserOrder {
  adress: IAdress,
  basket: IBasketItem[],
  checkoutDate: string,
  contacts: IUserData,
  id: number,
  totalSum: number,
  user_id: string | null
}

export interface FormData {
  email: string,
  password: string,
  phone: string,
  name: string
}

export interface singInData {
  email: string,
  password: string
}