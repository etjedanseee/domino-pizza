import React, { useState } from 'react'
import { IUserOrder } from '../types/Auth/IAuth'
import { sortBasketItems } from '../utils/sortBasketItems'

interface UserOrderProps {
  order: IUserOrder
}

const UserOrder = ({ order }: UserOrderProps) => {
  const { adress, basket, checkoutDate, totalSum } = order
  const sortedBasketItems = sortBasketItems(basket)

  const date = new Date(checkoutDate).toLocaleString()
  const countPizzasName = order.basket.length === 1 ? 'пицца' : order.basket.length < 5 ? 'пиццы' : 'пицц'

  const [basketVisible, setBasketVisible] = useState(false)

  const handleBasketVisible = () => {
    setBasketVisible(prev => !prev)
  }

  return (
    <div className='flex items-center gap-x-8 gap-y-2 mb-4 flex-wrap'>
      <div className='font-bold text-lg'>№{order.id}</div>
      <div className=''>{date}</div>
      <div
        className='px-8 font-medium hover:cursor-pointer select-none'
        onClick={handleBasketVisible}
      >
        {basket.length} {countPizzasName} (посмотреть)
      </div>
      <div>ул. {adress.street} {adress.house}/{adress.flat}</div>
      <div className='flex justify-end flex-1 font-bold text-lg'>{totalSum} ₽</div>

      {basketVisible && (
        <div className='py-2 w-full border-b-2'>
          {sortedBasketItems.map(item => (
            <div key={item.item.id} className='flex items-center gap-x-5 mb-3'>
              <img src={item.item.image} className='h-24' alt="pizza" />
              <div className='flex-1'>
                <div className='font-bold text-xl leading-none mb-2'>{item.item.name}</div>
                <div className='text-gray-500 font-medium leading-none mb-1'>{item.item.dough}, {item.item.size} см</div>
                <div className='flex flex-wrap text-gray-500'>
                  {[...item.item.ingredients].concat([...item.item.addedIngredients].map(ing => ing.name)).join(', ')}
                </div>
              </div>

              <div className='w-32 flex items-center gap-x-4'>
                <div className='font-bold text-lg'>{item.count}</div>
              </div>

              <div className='w-20 flex justify-end font-bold text-lg tracking-tighter'>
                {item.allSum} ₽
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserOrder