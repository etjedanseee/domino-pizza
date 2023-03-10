import { IBasketState, IBasketAction, BasketActionTypes } from './../../types/Basket/IBasketReducer';

const initialState: IBasketState = {
  items: [],
  count: 0,
  totalSum: 0
}

export const basketReducer = (state = initialState, action: IBasketAction): IBasketState => {
  switch (action.type) {
    case BasketActionTypes.ADD_ITEM: {
      return {
        items: [...state.items, action.payload],
        count: state.count + 1,
        totalSum: state.totalSum + action.payload.totalPrice
      }
    }
    case BasketActionTypes.DELETE_ITEM: {
      const filteredItems = state.items.filter(item => item.id !== action.payload.id)
      return {
        ...state,
        items: filteredItems,
        count: state.count - 1 || 0,
        totalSum: state.totalSum - action.payload.price
      }
    }
    default: return state
  }
}