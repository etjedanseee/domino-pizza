import React from 'react'
import { IBasketItem } from '../types/Basket/IBasket'
import MinusIcon from '../assets/minus.svg'
import PlusIcon from '../assets/plus.svg'
import DeleteIcon from '../assets/garbage.svg'


interface BasketItemProps {
  item: IBasketItem,
  count: number,
  allSum: number,
  id: number
}

const BasketItem = ({ item, allSum, count, id }: BasketItemProps) => {
  const allIngredients = [...item.ingredients].concat([...item.addedIngredients].map(ing => ing.name))

  const onPlusItem = () => {
    console.log('plus', id)
  }

  const onMinusItem = () => {
    console.log('minus', id)
  }

  const onDeleteItem = () => {
    console.log('delete', id)
  }

  return (
    <div className='flex items-center gap-x-5'>
      <div className='w-24 h-24 flex justify-center items-center border-2'>image</div>
      <div className='flex-1'>
        <div className='font-bold text-xl leading-none mb-2'>{item.name}</div>
        <div className='text-gray-500 font-medium leading-none mb-1'>{item.dough}, {item.size} см</div>
        <div className='flex flex-wrap text-gray-500'>{allIngredients.join(', ')}</div>
      </div>

      <div className='w-32 flex items-center gap-x-4'>
        {count === 1
          ? (
            <div
              className='hover:bg-gray-300 bg-gray-200 p-2 rounded-full'
              onClick={onDeleteItem}
            >
              <img src={DeleteIcon} alt="delete item" className='h-6' />
            </div>
          )
          : (
            <div
              className='hover:bg-gray-300 bg-gray-200 p-2 rounded-full'
              onClick={onMinusItem}
            >
              <img src={MinusIcon} alt="minus item" className='h-6' />
            </div>
          )
        }
        <div className='font-bold text-lg'>{count}</div>
        <div
          className='hover:bg-gray-300 bg-gray-200 p-2 rounded-full'
          onClick={onPlusItem}
        >
          <img src={PlusIcon} alt="plus item" className='h-6' />
        </div>
      </div>

      <div className='w-20 flex justify-end font-bold text-lg tracking-tighter'>
        {allSum} ₽
      </div>
    </div>
  )
}

export default BasketItem