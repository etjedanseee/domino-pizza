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
          name: string
          price: number
          count: number
        }
        Insert: {
          name: string
          price: number
          сount?: number
        }
        Update: {
          name?: string
          price?: number
          сount?: number
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
