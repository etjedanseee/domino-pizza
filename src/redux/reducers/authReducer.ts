import { AuthState, AuthAction, AuthActionTypes } from './../../types/Auth/IAuthReducer';


const initialState: AuthState = {
  user: null,
  userOrders: []
}

export const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AuthActionTypes.SET_USER: {
      return {
        ...state,
        user: action.payload
      }
    }
    case AuthActionTypes.GET_ORDERS: {
      return {
        ...state,
        userOrders: action.payload
      }
    }
    case AuthActionTypes.CLEAR_ORDERS: {
      return {
        ...state,
        userOrders: []
      }
    }
    default: return state
  }
}