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
  totalSum: number,
  deliveryPrice: number
}

const BasketOrder = ({ items, ingredients, totalSum, deliveryPrice }: BasketOrderProps) => {
  const [sortedItems, setSortedItems] = useState<IBasketSortedItem[]>([])
  const [disableButton, setDisableButton] = useState(false)
  const { addPizzaToBasket, decrementBasketItem, updateIngredients, showNotification } = useActions()

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
        showNotification({ color: 'red', text: 'К сожалению эти ингредиенты закончились' })
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
    <div className='p-4 rounded-2xl bg-white mb-5'>
      <div className='sm:text-lg text-xl font-bold mb-3'>Ваш заказ</div>
      <div className='h-[1px] bg-gray-200 mb-4'></div>
      <div className='flex flex-col'>
        {sortedItems.map(item => (
          <div key={item.item.id + item.allSum}>
            <BasketItem
              id={item.item.id}
              item={item.item}
              allSum={item.allSum}
              count={item.count}
              onIncrementItem={onIncrementItem}
              onDeleteBasketItem={onDeleteBasketItem}
            />
            <div className='h-[1px] bg-gray-200 my-3'></div>
          </div>
        ))}
      </div>
      <div className='text-right font-bold text-xl tracking-tighter'>{totalSum - deliveryPrice} ₽</div>
    </div>
  )
}

export default BasketOrder