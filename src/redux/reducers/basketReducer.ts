import { calcTotalSum } from './../../utils/calcTotalSum';
import { IBasketState, IBasketAction, BasketActionTypes } from './../../types/Basket/IBasketReducer';

const initialState: IBasketState = {
  items: [],
  count: 0,
  deliveryPrice: 0,
  totalSum: 0
}

export const basketReducer = (state = initialState, action: IBasketAction): IBasketState => {
  switch (action.type) {
    case BasketActionTypes.ADD_ITEM: {
      const newItems = [...state.items, action.payload]
      return {
        ...state,
        items: newItems,
        count: state.count + 1,
        totalSum: calcTotalSum(newItems, state.deliveryPrice)
      }
    }
    case BasketActionTypes.DELETE_ITEM: {
      const filteredItems = state.items.filter(item => item.id !== action.payload.id)
      return {
        ...state,
        items: filteredItems,
        count: state.count - 1 || 0,
        totalSum: calcTotalSum(filteredItems, state.deliveryPrice)
      }
    }
    case BasketActionTypes.CLEAR_ITEMS: {
      return {
        items: [],
        count: 0,
        deliveryPrice: 0,
        totalSum: 0
      }
    }
    case BasketActionTypes.SET_BASKET_ITEMS: {
      return {
        items: action.payload,
        count: action.payload.length,
        deliveryPrice: 0,
        totalSum: calcTotalSum(action.payload, 0)
      }
    }
    case BasketActionTypes.CHANGE_DELIVERY_ADRESS: {
      return {
        ...state,
        deliveryPrice: action.payload,
        totalSum: state.deliveryPrice < action.payload
          ? state.totalSum + (action.payload - state.deliveryPrice)
          : state.totalSum - (state.deliveryPrice - action.payload)
      }
    }
    default: return state
  }
}