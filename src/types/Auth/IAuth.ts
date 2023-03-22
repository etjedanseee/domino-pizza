
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