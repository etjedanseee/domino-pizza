import React, { useState } from 'react'
import { IUserOrder } from '../types/Auth/IAuth'
import { sortBasketItems } from '../utils/sortBasketItems'

interface UserOrderProps {
  order: IUserOrder
}

const UserOrder = ({ order }: UserOrderProps) => {
  const { adress, basket, checkoutDate, totalSum } = order
  const sortedBasketItems = sortBasketItems(basket)

  const date = new Date(checkoutDate).toLocaleString().slice(0, -3)
  const countPizzasName = order.basket.length === 1 ? 'пицца' : order.basket.length < 5 ? 'пиццы' : 'пицц'

  const [basketVisible, setBasketVisible] = useState(false)

  const handleBasketVisible = () => {
    setBasketVisible(prev => !prev)
  }

  return (
    <div className='sm:flex block items-center justify-between lg:gap-x-8 gap-x-4 gap-y-2 mb-4 flex-wrap'>
      <div className='flex items-center gap-x-4 flex-wrap'>
        <div className='xs:text-lg md:block font-bold hidden'>№{order.id}</div>
        <div className='md:font-medium font-bold xs:text-lg text-base'>{date}</div>
        <div className='font-medium'>ул. {adress.street} {adress.house}/{adress.flat}</div>
      </div>

      <div className='flex items-center sm:justify-end justify-between flex-1 gap-x-8 flex-wrap'>
        <div
          className='font-medium hover:cursor-pointer select-none'
          onClick={handleBasketVisible}
        >
          {basket.length} {countPizzasName} (посмотреть)
        </div>
        <div className='font-bold text-lg'>{totalSum} ₽</div>
      </div>

      {basketVisible && (
        <div className='py-2 w-full border-b-2'>
          {sortedBasketItems.map(item => (
            <div key={item.item.id} className='flex items-center md:gap-x-5 gap-x-3 gap-y-2 mb-3 md:flex-nowrap flex-wrap'>
              <div className='flex-1 flex min-w-[320px] gap-x-4'>
                <img src={item.item.image} className='h-24' alt="pizza" />
                <div>
                  <div className='font-bold text-xl leading-none md:mb-2 mb-1'>{item.item.name}</div>
                  <div className='text-gray-500 font-medium leading-none mb-1'>{item.item.dough}, {item.item.size} см</div>
                  <div className='flex flex-wrap text-gray-500 md:leading-normal leading-none'>
                    {[...item.item.ingredients].concat([...item.item.addedIngredients].map(ing => ing.name)).join(', ')}
                  </div>
                </div>
              </div>

              <div className='flex sm:w-auto w-full justify-end items-center gap-x-4'>
                <div className='font-bold text-lg'>{item.count}</div>
                <div className='md:w-20 w-16 flex justify-end font-bold sm:text-lg text-xl tracking-tighter'>
                  {item.allSum} ₽
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserOrder