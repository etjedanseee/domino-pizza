import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ReactComponent as BasketIcon } from '../assets/basket.svg'
import { ReactComponent as ArrowBackIcon } from '../assets/arrow-back.svg'
import { ReactComponent as AuthIcon } from '../assets/user.svg'
import Modal from '../UI/Modal'
import AuthPage from '../pages/AuthPage'

interface HeaderMenuProps {
  basketCount: number,
  isGoBackVisible: boolean
}

const HeaderMenu = ({ basketCount, isGoBackVisible }: HeaderMenuProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleModalVisible = () => {
    setIsModalVisible(prev => !prev)
  }

  return (
    <div className='fixed z-50 top-0 left-0 w-full bg-zinc-900 '>
      <div className='container mx-auto flex justify-between items-center px-5 py-3'>
        {isGoBackVisible && (
          <NavLink to='/'>
            <ArrowBackIcon className='h-12 w-12 rotate-180 fill-white px-2 bg-gray-500 rounded-full' />
          </NavLink>
        )}

        <div onClick={handleModalVisible}>
          <AuthIcon className='h-10 w-10 fill-white' />
        </div>

        {isModalVisible && (
          <Modal onClose={handleModalVisible}>
            <AuthPage onClose={handleModalVisible} />
          </Modal>
        )}

        <NavLink to='/basket' className='relative'>
          <BasketIcon className='h-12 w-12 p-2 bg-red-500 rounded-full fill-white' />
          <div className='absolute -top-1 -right-2 bg-white text-red-500 px-2 rounded-full font-medium'>
            {basketCount > 0 && basketCount}
          </div>
        </NavLink>
      </div>
    </div>
  )
}

export default HeaderMenu