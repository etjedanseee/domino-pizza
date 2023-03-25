import React, { useState } from 'react'
import BasketAdress from '../components/BasketAdress'
import BasketForm from '../components/BasketContact'
import BasketOrder from '../components/BasketOrder'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { IAnonUser } from '../types/Auth/IAuth'
import { IAdress, IOrder } from '../types/Basket/IBasket'
import AddButton from '../UI/AddButton'

const Basket = () => {
  const { items, totalSum, deliveryPrice } = useTypedSelector(state => state.basket)
  const { ingredients } = useTypedSelector(state => state.pizza)
  const { user } = useTypedSelector(state => state.auth)

  const { showNotification, checkoutOrder } = useActions()

  const [anonUserData, setAnonUserData] = useState<IAnonUser | null>(null)
  const [adress, setAdress] = useState<IAdress | null>(null)

  const onCheckOut = () => {
    if (!items.length) {
      showNotification({ text: 'Корзина пуста!', color: 'red' })
    } else if (!(user || anonUserData)) {
      showNotification({ text: 'Войдите или введите данные', color: 'red' })
    } else if (!adress) {
      showNotification({ text: 'Укажите адрес доставки', color: 'red' })
    } else if (totalSum < 600) {
      showNotification({ text: 'Сумма заказа меньше 600 ₽', color: 'red' })
    } else {
      const obj: IOrder = {
        contacts: user?.data || anonUserData || { name: 'No name', phone: '1234567890' },
        adress: adress,
        basket: items,
        totalSum: totalSum,
        checkoutDate: new Date(),
        user_id: user?.id || null
      }
      console.log('заказ: ', obj)
      checkoutOrder(obj)
      showNotification({ text: 'Заказ успешно оформлен! В течение 2 часов с вами свяжется курьер', color: 'green', time: 5000 })
    }
  }

  return (
    <div className='container mx-auto py-20'>
      <div className='text-3xl font-bold px-4 mb-5'>Моя корзина</div>
      {items.length > 0 ? (
        <BasketOrder
          items={items}
          ingredients={ingredients}
          totalSum={totalSum}
          deliveryPrice={deliveryPrice}
        />
      )
        : <div className='py-4 px-4 rounded-2xl bg-white text-2xl font-bold text-gray-600 text-center mb-5'>Корзина пуста</div>
      }

      {!user && (
        <BasketForm setAnonUserData={setAnonUserData} />
      )}

      <BasketAdress setAdress={setAdress} />

      <AddButton price={totalSum} title='Оформить заказ' onClick={onCheckOut} />
    </div>
  )
}

export default Basket