import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UserOrder from '../components/UserOrder'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'

const UserOrders = () => {
  const { userOrders, user } = useTypedSelector(state => state.auth)

  const reversedUserOrders = [...userOrders].reverse()

  const { getUserOrders } = useActions()

  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      getUserOrders()
    } else {
      navigate('/')
    }
  }, [user])

  return (
    <div className='container mx-auto py-20 max-lg:max-w-none h-screen'>
      <div className='p-4 rounded-2xl bg-white'>
        <div className='xs:text-xl text-2xl font-bold mb-3'>Ваша история заказов</div>
        {reversedUserOrders.length > 0 ? (
          <div>
            {reversedUserOrders.map(order => (
              <UserOrder key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className='text-lg font-medium'>Нет заказов</div>
        )}
      </div>
    </div>
  )
}

export default UserOrders