import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ReactComponent as BasketIcon } from '../assets/basket.svg'
import { ReactComponent as ArrowBackIcon } from '../assets/arrow-back.svg'
import { ReactComponent as AuthIcon } from '../assets/user.svg'
import Modal from '../UI/Modal'
import AuthPage from '../pages/AuthPage'
import { useTypedSelector } from '../hooks/useTypedSelector'

interface HeaderMenuProps {
  basketCount: number,
  isGoBackVisible: boolean
}

const HeaderMenu = ({ basketCount, isGoBackVisible }: HeaderMenuProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { user } = useTypedSelector(state => state.auth)

  const handleModalVisible = () => {
    setIsModalVisible(prev => !prev)
  }

  return (
    <div className='fixed z-40 top-0 left-0 w-full bg-zinc-900 '>
      <div className='container mx-auto flex justify-end items-center gap-x-8 px-5 py-3'>
        <div className='flex-1 justify-self-start flex justify-start'>
          {isGoBackVisible
            ? <NavLink to='/' className=''>
              <ArrowBackIcon className='h-12 w-12 rotate-180 fill-white px-2 bg-gray-500 rounded-full' />
            </NavLink>
            : <div className='text-white font-medium text-xl'>Pizza Domino</div>
          }
        </div>

        <div onClick={handleModalVisible}>
          <AuthIcon className={`h-10 w-10 ${user ? 'fill-blue-700' : 'fill-white'} `} />
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