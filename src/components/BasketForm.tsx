import React, { useState, useEffect, ChangeEvent } from 'react'
import AuthPage from '../pages/AuthPage'
import Modal from '../UI/Modal'
import { regPhone } from '../utils/consts'

const BasketForm = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const [nameError, setNameError] = useState('Имя обязательно')
  const [phoneError, setPhoneError] = useState('Пароль обязателен')

  const [isNameDirty, setIsNameDirty] = useState(false)
  const [isPhoneDirty, setIsPhoneDirty] = useState(false)

  const [isFormValid, setIsFormValid] = useState(false)

  const handleModalVisible = () => {
    setIsModalVisible(prev => !prev)
  }

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    if (!e.target.value.length) {
      setNameError('Имя обязательно')
    } else {
      setNameError('')
    }
  }
  const onPhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value)
    if (!e.target.value.length) {
      setPhoneError('Номер телефона обязателен')
    } else if (!e.target.value.match(regPhone)) {
      setPhoneError('Некорректный номер телефона')
    } else {
      setPhoneError('')
    }
  }

  const onNameBlur = () => {
    setIsNameDirty(true)
  }
  const onPhoneBlur = () => {
    setIsPhoneDirty(true)
  }

  useEffect(() => {
    if (!nameError && !phoneError) {
      setIsFormValid(true)
    } else {
      setIsFormValid(false)
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