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
    default: return state
  }
}