import React, { useState } from 'react'
import BasketItem from '../components/BasketItem'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { sortBasketItems } from '../utils/sortBasketItems'


const Basket = () => {
  const { count, items, totalSum } = useTypedSelector(state => state.basket)

  const [sortedItems, setSortedItems] = useState(sortBasketItems(items))

  return (
    <div className='pt-20 container mx-auto'>

      <div className='text-3xl font-bold px-4 mb-5'>Моя корзина</div>
      {sortedItems.length > 0 ? (
        <div className='py-4 px-4 rounded-2xl bg-white'>
          <div className='text-lg font-bold mb-3'>Ваш заказ</div>
          <div className='h-[1px] bg-gray-200 mb-6'></div>
          <div className='flex flex-col gap-y-5'>
            {sortedItems.map(item => (
              <BasketItem
                id={item.item.id}
                item={item.item}
                allSum={item.allSum}
                count={item.count}
                key={item.item.id + item.allSum}
              />
            ))}
          </div>
        </div>
      )
        : <div>No items in basket</div>
      }
    </div>
  )
}

export default Basket