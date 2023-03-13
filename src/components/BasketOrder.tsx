import React, { useEffect, useState } from 'react'
import { useActions } from '../hooks/useActions'
import { IBasketItem, IBasketSortedItem } from '../types/Basket/IBasket'
import { IIngredient } from '../types/Pizza/IPizza'
import { isHaveIncludeIngredients } from '../utils/isHaveIncludeIngredients'
import { sortBasketItems } from '../utils/sortBasketItems'
import BasketItem from './BasketItem'

interface BasketOrderProps {
  items: IBasketItem[],
  ingredients: IIngredient[],
  totalSum: number
}

const BasketOrder = ({ items, ingredients, totalSum }: BasketOrderProps) => {
  const [sortedItems, setSortedItems] = useState<IBasketSortedItem[]>([])
  const [disableButton, setDisableButton] = useState(false)
  const { addPizzaToBasket, decrementBasketItem, updateIngredients } = useActions()

  const onIncrementItem = (item: IBasketItem) => {
    if (!disableButton) {
      const isHaveThisIngredients = isHaveIncludeIngredients(ingredients, item.addedIngredients)
      if (isHaveThisIngredients) {
        setDisableButton(true)
        updateIngredients(ingredients, item.addedIngredients, false)
        addPizzaToBasket({ ...item, id: Date.now() })
        setTimeout(() => { setDisableButton(false) }, 500)
      } else {
        setSortedItems([...sortedItems])
        window.alert('К сожалению эти ингредиенты закончились')
      }
    }
  }

  const onDeleteBasketItem = (id: number, price: number, addedIngr: IIngredient[]) => {
    if (!disableButton) {
      setDisableButton(true)
      updateIngredients(ingredients, addedIngr, true)
      decrementBasketItem(id, price)
      setTimeout(() => { setDisableButton(false) }, 500)
    }
  }

  useEffect(() => {
    setSortedItems(sortBasketItems(items))
  }, [items])

  return (
    <div className='py-4 px-4 rounded-2xl bg-white mb-5'>
      <div className='text-lg font-bold mb-3'>Ваш заказ</div>
      <div className='h-[1px] bg-gray-200 mb-6'></div>
      <div className='flex flex-col gap-y-5'>
        {sortedItems.map(item => (
          <BasketItem
            id={item.item.id}
            item={item.item}
            allSum={item.allSum}
            count={item.count}
            key={item.item.id + item.allSum}
            onIncrementItem={onIncrementItem}
            onDeleteBasketItem={onDeleteBasketItem}
          />
        ))}
      </div>
      <div className='h-[1px] bg-gray-200 my-6'></div>
      <div className='text-right  font-bold text-xl tracking-tighter'>{totalSum} ₽</div>
    </div>
  )
}

export default BasketOrder