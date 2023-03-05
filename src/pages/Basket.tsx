import React from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'


const Basket = () => {
  const { count, items, totalSum } = useTypedSelector(state => state.basket)

  return (
    <div className='pt-14'>
      <div>Count: {count}</div>
      <div>Total sum: {totalSum}</div>
    </div>
  )
}

export default Basket