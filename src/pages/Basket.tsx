import React from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { sortBasketItems } from '../utils/sortBasketItems'


const Basket = () => {
  const { count, items, totalSum } = useTypedSelector(state => state.basket)

  const sortedItems = sortBasketItems(items)

  return (
    <div className='pt-14'>
      <div>Count: {count}</div>
      <div>Total sum: {totalSum}</div>
    </div>
  )
}

export default Basket