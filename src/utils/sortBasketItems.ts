import { IBasketItem, IBasketSortedItem } from './../types/Basket/IBasket';
import { isPizzasEqual } from './isPizzasEqual';

export const sortBasketItems = (items: IBasketItem[]): IBasketSortedItem[] => {
  if (!items.length) {
    return []
  }
  const res: IBasketSortedItem[] = [{
    item: items[0],
    count: 1,
    allSum: items[0].totalPrice
  }]

  for (let i = 1; i < items.length; i++) {
    let isFindEqual = false
    for (let j = 0; j < res.length; j++) {
      const isEqual = isPizzasEqual(items[i], res[j].item)
      // console.log('eq', isEqual, items[i], res[j].item)
      if (isEqual) {
        res[j].count++
        res[j].allSum += res[j].item.totalPrice
        isFindEqual = true
        break
      }
    }
    if (!isFindEqual) {
      res.push({
        item: items[i],
        count: 1,
        allSum: items[i].totalPrice
      })
    }
  }

  // console.log('res', res)
  return res
}