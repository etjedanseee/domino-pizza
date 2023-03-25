import { IUserData } from './types/Auth/IAuth';
import { IAdress, IBasketItem } from './types/Basket/IBasket';
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      AdditionalIngredients: {
        Row: {
          count: number
          name: string
          price: number
        }
        Insert: {
          count?: number
          name: string
          price: number
        }
        Update: {
          count?: number
          name?: string
          price?: number
        }
      }
      Orders: {
        Row: {
          adress: Json
          basket: Json[]
          checkoutDate: string
          contacts: Json
          id: number
          totalSum: number
          user_id: string | null
        }
        Insert: {
          adress: IAdress
          basket: IBasketItem[]
          checkoutDate: Date
          contacts: IUserData
          id?: number
          totalSum: number
          user_id: string | null
        }
        Update: {
          adress?: Json
          basket?: Json[]
          checkoutDate?: string
          contacts?: Json
          id?: number
          totalSum?: number
          user_id?: string | null
        }
      }
      Pizza: {
        Row: {
          dough: string[]
          id: number
          image: string
          ingredients: string[]
          name: string
          sizes: number[]
          sizesPrice: number[]
        }
        Insert: {
          dough: string[]
          id?: number
          image: string
          ingredients: string[]
          name?: string
          sizes: number[]
          sizesPrice: number[]
        }
        Update: {
          dough?: string[]
          id?: number
          image?: string
          ingredients?: string[]
          name?: string
          sizes?: number[]
          sizesPrice?: number[]
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
