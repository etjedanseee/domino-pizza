import React, { useState, useEffect } from 'react'
import { useInput } from '../hooks/useInput'
import AuthPage from '../pages/AuthPage'
import { IAnonUser } from '../types/Auth/IAuth'
import Modal from '../UI/Modal'
import { regPhone } from '../utils/consts'

interface IBasketFormProps {
  setAnonUserData: (anonUserData: IAnonUser | null) => void
}

const BasketForm = ({ setAnonUserData }: IBasketFormProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const { value: name, error: nameError, isDirty: isNameDirty, onChange: onNameChange, onBlur: onNameBlur } = useInput({
    options: [
      { key: 'required', error: 'Имя обязательно' },
      { key: 'minLength', value: 2, error: 'Имя должно быть длиннее 2 букв' }
    ],
    initialErrorMessage: 'Имя обязательно'
  })

  const { value: phone, error: phoneError, isDirty: isPhoneDirty, onChange: onPhoneChange, onBlur: onPhoneBlur } = useInput({
    options: [
      { key: 'required', error: 'Номер телефона обязателен' },
      { key: 'pattern', value: regPhone, error: 'Некорректный номер телефона' }
    ],
    initialErrorMessage: 'Номер телефона обязателен'
  })

  const handleModalVisible = () => {
    setIsModalVisible(prev => !prev)
  }

  useEffect(() => {
    if (!nameError && !phoneError) {
      setAnonUserData({ name, phone })
    } else {
      setAnonUserData(null)
    }
  }, [nameError, phoneError])

  return (
    <div className='py-4 px-4 rounded-2xl bg-white mb-5'>
      <div className='text-lg font-bold mb-3'>Контактная информация</div>
      <div className='mb-5'>
        <span className='text-red-500 underline' onClick={handleModalVisible}>Войти</span> или заполнить форму ниже
      </div>

      <form className='flex justify-between gap-x-4 mb-5'>
        <div className='w-full'>
          <input
            value={name}
            onChange={onNameChange}
            onBlur={onNameBlur}
            placeholder='Введите ваше имя'
            className='outline-none placeholder:text-gray-600 text-lg border-2 border-gray-500 w-full rounded-md px-4 py-1'
            spellCheck="false"
          />
          {(nameError && isNameDirty) && <div className='text-red-500 text-sm px-4 font-medium'>{nameError}</div>}
        </div>

        <div className='w-full'>
          <input
            value={phone}
            onChange={onPhoneChange}
            onBlur={onPhoneBlur}
            placeholder='Введите номер телефона'
            className='outline-none placeholder:text-gray-600 text-lg border-2 border-gray-500 w-full rounded-md px-4 py-1'
            spellCheck="false"
          />
          {(phoneError && isPhoneDirty) && <div className='text-red-500 text-sm px-4 font-medium'>{phoneError}</div>}
        </div>
      </form>

      {isModalVisible && (
        <Modal onClose={handleModalVisible}>
          <AuthPage onClose={handleModalVisible} />
        </Modal>
      )}
    </div>
  )
}

export default BasketForm