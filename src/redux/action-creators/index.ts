import * as PizzaActionCreators from './pizza'
import * as BasketActionCreators from './basket'
import * as AuthActionCreators from './auth'

export default {
  ...PizzaActionCreators,
  ...BasketActionCreators,
  ...AuthActionCreators
}