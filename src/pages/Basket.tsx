import React, { } from 'react'
import BasketOrder from '../components/BasketOrder'
import { useTypedSelector } from '../hooks/useTypedSelector'
import AddButton from '../UI/AddButton'

const Basket = () => {
  const { items, totalSum } = useTypedSelector(state => state.basket)
  const { ingredients } = useTypedSelector(state => state.pizza)

  return (
    <div className='container mx-auto py-20'>
      <div className='text-3xl font-bold px-4 mb-5'>Моя корзина</div>
      {items.length > 0 ? (
        <BasketOrder
          items={items}
          ingredients={ingredients}
          totalSum={totalSum}
        />
      )
        : <div className='py-4 px-4 rounded-2xl bg-white text-2xl font-bold text-gray-600 text-center mb-5'>Корзина пуста</div>
      }
      <AddButton price={totalSum} title='Оформить заказ' onClick={() => { }} />
    </div>
  )
}

export default Basket