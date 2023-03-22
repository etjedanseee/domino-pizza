import * as PizzaActionCreators from './pizza'
import * as BasketActionCreators from './basket'
import * as AuthActionCreators from './auth'
import * as NotificationActionCreators from './notification'

export default {
  ...PizzaActionCreators,
  ...BasketActionCreators,
  ...AuthActionCreators,
  ...NotificationActionCreators
}