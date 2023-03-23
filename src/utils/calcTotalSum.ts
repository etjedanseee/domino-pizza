import { IBasketItem } from './../types/Basket/IBasket';

export const calcTotalSum = (items: IBasketItem[], deliveryPrice: number): number => {
  let sum = 0;
  for (let item of items) {
    sum += item.totalPrice
  }
  return sum + deliveryPrice
}