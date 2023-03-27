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

export interface IConfirmedUser {
  email: string,
  phone: string
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