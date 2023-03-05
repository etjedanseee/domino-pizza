import * as PizzaActionCreators from './pizza'
import * as BasketActionCreators from './basket'

export default {
  ...PizzaActionCreators,
  ...BasketActionCreators
}