import React, { useState, useEffect } from 'react'
import BasketItem from '../components/BasketItem'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { IBasketItem, IBasketSortedItem } from '../types/Basket/IBasket'
import { IIngredient } from '../types/Pizza/IPizza'
import { isHaveIncludeIngredients } from '../utils/isHaveIncludeIngredients'
import { sortBasketItems } from '../utils/sortBasketItems'


const Basket = () => {
  const { count, items, totalSum } = useTypedSelector(state => state.basket)
  const { ingredients } = useTypedSelector(state => state.pizza)
  const { addPizzaToBasket, decrementBasketItem, updateIngredients } = useActions()

  const [sortedItems, setSortedItems] = useState<IBasketSortedItem[]>([])
  const [disableButton, setDisableButton] = useState(false)

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
    <div className='py-20 container mx-auto'>
      <div className='text-3xl font-bold px-4 mb-5'>Моя корзина</div>
      {sortedItems.length > 0 ? (
        <div className='py-4 px-4 rounded-2xl bg-white'>
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
        </div>
      )
        : <div className='py-4 px-4 rounded-2xl bg-white text-2xl font-bold text-gray-600 text-center'>Корзина пуста</div>
      }
    </div>
  )
}

export default Basket