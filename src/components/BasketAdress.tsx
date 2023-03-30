import React, { useEffect } from 'react'
import { useActions } from '../hooks/useActions'
import { useInput } from '../hooks/useInput'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { IAdress } from '../types/Basket/IBasket'
import { regIsNumber } from '../utils/consts'

interface IBasketAdressProps {
  setAdress: (adress: IAdress | null) => void
}

const BasketAdress = ({ setAdress }: IBasketAdressProps) => {
  const { deliveryPrice } = useTypedSelector(state => state.basket)
  const { changeDeliveryAdress } = useActions()

  const { value: street, error: streetError, isDirty: isStreetDirty, onChange: onStreetChange, onBlur: onStreetBlur } = useInput({
    options: [
      { key: 'required', error: 'Улица обязательна' },
      { key: 'minLength', value: 3, error: 'Улица должна быть длиннее 3 букв' }
    ],
    initialErrorMessage: 'Улица обязательна'
  })
  const { value: house, error: houseError, isDirty: isHouseDirty, onChange: onHouseChange, onBlur: onHouseBlur } = useInput({
    options: [
      { key: 'required', error: 'Номер дома обязателен' },
      { key: 'pattern', value: regIsNumber, error: 'Некорректный номер дома' },
      { key: 'min', value: 0, error: 'Номер дома должен быть больше 0' }
    ],
    initialErrorMessage: 'Номер дома обязателен'
  })
  const { value: flat, error: flatError, isDirty: isFlatDirty, onChange: onFlatChange, onBlur: onFlatBlur } = useInput({
    options: [
      { key: 'required', error: 'Номер квартиры обязателен' },
      { key: 'pattern', value: regIsNumber, error: 'Некорректный номер квартиры' },
      { key: 'min', value: 0, error: 'Номер квартиры должен быть больше 0' }
    ],
    initialErrorMessage: 'Номер квартиры обязателен'
  })
  const { value: intercomCode, error: intercomCodeError, isDirty: isIntercomCodeDirty, onChange: onIntercomCodeChange, onBlur: onIntercomCodeBlur } = useInput({
    options: [
      { key: 'length', value: 4, error: 'Код состоит из 4 цифр' },
      { key: 'pattern', value: regIsNumber, error: 'Некорректный номер домофона' },
    ],
    initialErrorMessage: ''
  })

  useEffect(() => {
    const price = flat ? +(Math.random() * (300 - 50) + 50).toFixed(0) : 0
    changeDeliveryAdress(price)
  }, [flat])

  useEffect(() => {
    if (!streetError && !houseError && !flatError && !intercomCodeError) {
      setAdress({
        street,
        house: +house,
        flat: +flat,
        intercomCode: intercomCode.length ? +intercomCode : 0,
        deliveryPrice: deliveryPrice
      })
    } else {
      setAdress(null)
    }
  }, [streetError, houseError, flatError, intercomCodeError, deliveryPrice])

  return (
    <div className='p-4 rounded-2xl bg-white mb-5'>
      <div className='sm:text-lg text-xl font-bold mb-3'>Адрес</div>
      <form className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 justify-between gap-x-4 mb-2 gap-y-2'>
        <div className='w-full'>
          <input
            value={street}
            onChange={onStreetChange}
            onBlur={onStreetBlur}
            placeholder='Введите вашу улицу'
            className='outline-none placeholder:text-gray-600 text-lg border-2 border-gray-500 w-full rounded-md px-4 py-1'
            spellCheck="false"
          />
          {(streetError && isStreetDirty) && <div className='text-red-500 text-sm px-4 font-medium'>{streetError}</div>}
        </div>

        <div className='w-full'>
          <input
            value={house}
            onChange={onHouseChange}
            onBlur={onHouseBlur}
            placeholder='Введите номер дома'
            className='outline-none placeholder:text-gray-600 text-lg border-2 border-gray-500 w-full rounded-md px-4 py-1'
          />
          {(houseError && isHouseDirty) && <div className='text-red-500 text-sm px-4 font-medium'>{houseError}</div>}
        </div>

        <div className='w-full'>
          <input
            value={flat}
            onChange={onFlatChange}
            onBlur={onFlatBlur}
            placeholder='Введите номер квартиры'
            className='outline-none placeholder:text-gray-600 text-lg border-2 border-gray-500 w-full rounded-md px-4 py-1'
          />
          {(flatError && isFlatDirty) && <div className='text-red-500 text-sm px-4 font-medium'>{flatError}</div>}
        </div>

        <div className='w-full'>
          <input
            value={intercomCode}
            onChange={onIntercomCodeChange}
            onBlur={onIntercomCodeBlur}
            placeholder='Введите код домофона'
            className='outline-none placeholder:text-gray-600 text-lg border-2 border-gray-500 w-full rounded-md px-4 py-1'
          />
          {(intercomCodeError && isIntercomCodeDirty) && <div className='text-red-500 text-sm px-4 font-medium'>{intercomCodeError}</div>}
        </div>
      </form>

      <div className='text-lg font-bold mb-3'>Стоимость доставки: {deliveryPrice} ₽</div>
    </div>
  )
}

export default BasketAdress