import React, { MouseEvent, useState } from 'react'
import { IIngredient } from '../types/Pizza/IPizza'
import { ReactComponent as CloseIcon } from '../assets/close.svg'
import AddButton from '../UI/AddButton'
import { calcAddedIngredients } from '../utils/calcAddedIngredients'
import { useActions } from '../hooks/useActions'

interface AdditionalIngredientsProps {
  pizzaIngredients: string[],
  ingredients: IIngredient[],
  addedIngredients: IIngredient[],
  changeAddedIngredients: (editedIngr: IIngredient[]) => void,
  updatePrice: (addedPrice: number) => void
}

const AdditionalIngredients = ({ pizzaIngredients, ingredients, addedIngredients, changeAddedIngredients, updatePrice }: AdditionalIngredientsProps) => {
  const [price, setPrice] = useState(calcAddedIngredients(addedIngredients))

  const { showNotification } = useActions()

  const handleAddIngredient = (name: string) => {
    const currentIng = addedIngredients.find(i => i.name === name)
    if (currentIng) {
      const otherIngr = addedIngredients.filter(i => i.name !== name)
      if (currentIng.count < 3 && ingredients.find(i => i.name === name && i.count > currentIng.count)) {
        changeAddedIngredients([...otherIngr, { ...currentIng, count: currentIng.count + 1 }])
        setPrice(prev => prev + currentIng.price)
      } else {
        changeAddedIngredients([...otherIngr])
        setPrice(prev => prev - (currentIng.count * currentIng.price))
        showNotification({ text: 'Данного ингредиента нет в наличии', color: 'red', time: 1500 })
      }
    } else {
      const currentIng = ingredients.find(i => i.name === name) || ingredients[0]
      if (currentIng.count > 0) {
        changeAddedIngredients([...addedIngredients, { name, price: currentIng.price, count: 1 }])
        setPrice(prev => prev + currentIng.price)
      }
    }
  }

  const handleDeleteIngredient = (e: MouseEvent<HTMLDivElement>, name: string) => {
    e.stopPropagation()
    const otherIngr = addedIngredients.filter(i => i.name !== name)
    const currentIngr = addedIngredients.find(i => i.name === name) || ingredients[0]
    changeAddedIngredients([...otherIngr])
    setPrice(prev => prev - (currentIngr.count * currentIngr.price))
  }

  return (
    <div className='max-w-lg bg-white sm:p-4 p-2 rounded-2xl overflow-auto'>
      <div className='text-sm mb-3 font-medium uppercase'>Ингредиенты</div>
      <div className='flex flex-wrap gap-2 sm:mb-5 mb-3'>
        {pizzaIngredients.map(ing => (
          <div
            key={ing}
            className='text-white bg-gray-500 rounded-2xl sm:text-sm text-xs font-medium px-4 py-1'
          >{ing}</div>
        ))}
      </div>

      <div className='text-sm font-medium mb-2'>Дополнительные ингредиенты</div>
      <div className='text-sm text-gray-500 sm:mb-5 mb-3'>Чтобы добавить несколько одинаковых ингредиентов, нажмите на него несколько раз</div>

      <div className='flex flex-wrap sm:gap-2 gap-1 mb-5'>
        {ingredients.map(i => (
          <div
            key={i.name}
            className={`${addedIngredients.find(ing => ing.name === i.name) ? 'text-white bg-gray-500' : 'bg-gray-200 text-gray-600'} 
            rounded-2xl sm:text-sm text-xs font-medium relative`}
            onClick={() => handleAddIngredient(i.name)}
          >
            <div className={`${addedIngredients.find(ing => ing.name === i.name) ? 'mr-10' : ''} 
            ${ingredients.find(ing => ing.name === i.name)?.count === 0 ? 'line-through' : ''} sm:px-4 px-3 py-1 select-none`}>
              {i.name}
            </div>
            {addedIngredients.find(ing => ing.name === i.name) && (
              <div className='absolute top-0 right-0 flex items-center'>
                <div className='mr-2'>
                  +{addedIngredients.find(ing => ing.name === i.name)?.count}
                </div>
                <div onClick={(e) => handleDeleteIngredient(e, i.name)}>
                  <CloseIcon className='sm:h-7 sm:w-7 h-6 w-6 fill-white bg-red-600 rounded-full p-1' />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <AddButton title='Обновить' onClick={() => updatePrice(price)} price={price} />
    </div>
  )
}

export default AdditionalIngredients