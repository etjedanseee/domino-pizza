import React from 'react'
import { IBasketItem } from '../types/Basket/IBasket'
import MinusIcon from '../assets/minus.svg'
import PlusIcon from '../assets/plus.svg'
import DeleteIcon from '../assets/garbage.svg'
import { IIngredient } from '../types/Pizza/IPizza'


interface BasketItemProps {
  item: IBasketItem,
  count: number,
  allSum: number,
  id: number,
  onIncrementItem: (item: IBasketItem) => void,
  onDeleteBasketItem: (id: number, price: number, addedIng: IIngredient[]) => void
}

const BasketItem = ({ item, allSum, count, id, onIncrementItem, onDeleteBasketItem }: BasketItemProps) => {
  const allIngredients = [...item.ingredients].concat([...item.addedIngredients].map(ing => ing.name))
  const addedIngrCount = item.addedIngredients.length


  const onPlusItem = () => {
    onIncrementItem(item)
  }

  const onDeleteItem = () => {
    onDeleteBasketItem(id, item.totalPrice, item.addedIngredients)
  }

  return (
    <div className='flex items-center md:gap-x-5 gap-x-3 md:flex-nowrap flex-wrap gap-y-2'>
      <img src={item.image} className='sm:h-24 h-32' alt="pizza" />
      <div className='flex-1'>
        <div className='font-bold text-xl leading-none md:mb-2 mb-1'>
          {addedIngrCount ? item.name + ` (+${addedIngrCount})` : item.name}
        </div>
        <div className='text-gray-500 font-medium leading-none mb-1'>{item.dough}, {item.size} см</div>
        <div className='flex flex-wrap text-gray-500 md:leading-tight leading-none'>{allIngredients.join(', ')}</div>
      </div>
      <div className='sm:w-auto w-screen flex justify-end items-center'>
        <div className='sm:w-32 w-28 flex items-center md:gap-x-4 gap-x-2'>
          <div
            className='hover:bg-gray-300 bg-gray-200 p-2 rounded-full'
            onClick={onDeleteItem}
          >
            {count === 1
              ? <img src={DeleteIcon} alt="delete item" className='sm:h-6 h-5' />
              : <img src={MinusIcon} alt="minus item" className='sm:h-6 h-5' />
            }
          </div>
          <div className='font-bold text-lg'>{count}</div>
          <div
            className='hover:bg-gray-300 bg-gray-200 p-2 rounded-full'
            onClick={onPlusItem}
          >
            <img src={PlusIcon} alt="plus item" className='sm:h-6 h-5' />
          </div>
        </div>

        <div className='md:w-20 w-16 flex justify-end font-bold sm:text-lg text-xl tracking-tighter'>
          {allSum} ₽
        </div>
      </div>
    </div>

  )
}

export default BasketItem