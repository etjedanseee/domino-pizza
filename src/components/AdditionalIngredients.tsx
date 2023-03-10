import React, { MouseEvent, useState } from 'react'
import { IIngredient } from '../types/Pizza/IPizza'
import { ReactComponent as CloseIcon } from '../assets/close.svg'
import AddButton from '../UI/AddButton'
import { calcAddedIngredients } from '../utils/calcAddedIngredients'

interface AdditionalIngredientsProps {
  pizzaIngredients: string[],
  ingredients: IIngredient[],
  addedIngredients: IIngredient[],
  changeAddedIngredients: (editedIngr: IIngredient[]) => void,
  updatePrice: (addedPrice: number) => void
}

const AdditionalIngredients = ({ pizzaIngredients, ingredients, addedIngredients, changeAddedIngredients, updatePrice }: AdditionalIngredientsProps) => {
  const [price, setPrice] = useState(calcAddedIngredients(addedIngredients))

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
    <div className='max-w-lg bg-white p-4 rounded-2xl'>
      <div className='text-sm mb-5 font-medium uppercase'>Ингредиенты</div>
      <div className='flex flex-wrap gap-2 mb-5'>
        {pizzaIngredients.map(ing => (
          <div
            key={ing}
            className='text-white bg-gray-500 rounded-2xl text-sm font-medium px-4 py-1'
          >{ing}</div>
        ))}
      </div>

      <div className='text-sm mb-2 font-medium'>Дополнительные ингредиенты</div>
      <div className='text-sm text-gray-500 mb-5'>Чтобы добавить несколько одинаковых ингредиентов, нажмите на него несколько раз</div>

      <div className='flex flex-wrap gap-2 mb-5'>
        {ingredients.map(i => (
          <div
            key={i.name}
            className={`${addedIngredients.find(ing => ing.name === i.name) ? 'text-white bg-gray-500' : 'bg-gray-200 text-gray-600'} 
            rounded-2xl text-sm font-medium relative`}
            onClick={() => handleAddIngredient(i.name)}
          >
            <div className={`${addedIngredients.find(ing => ing.name === i.name) ? 'mr-10' : ''} 
            ${ingredients.find(ing => ing.name === i.name)?.count === 0 ? 'line-through' : ''} px-4 py-1`}>
              {i.name}
            </div>
            {addedIngredients.find(ing => ing.name === i.name) && (
              <div className='absolute top-0 right-0 flex items-center'>
                <div className='mr-2'>
                  +{addedIngredients.find(ing => ing.name === i.name)?.count}
                </div>
                <div onClick={(e) => handleDeleteIngredient(e, i.name)}>
                  <CloseIcon className='h-7 w-7 fill-white bg-red-600 rounded-full p-1' />
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