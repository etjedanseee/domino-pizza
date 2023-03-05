import React from 'react'
import { IIngredient } from '../types/Pizza/IPizza'
import { ReactComponent as CloseIcon } from '../assets/close.svg'

interface AdditionalIngredientsProps {
  ingredients: IIngredient[],
  addedIngredients: IIngredient[],
  onAdd: (name: string) => void,
  deleteIngredient: (name: string) => void
}

const AdditionalIngredients = ({ ingredients, addedIngredients, onAdd, deleteIngredient }: AdditionalIngredientsProps) => {
  return (
    <>
      <div className='text-sm mb-2 font-medium'>Дополнительные ингредиенты</div>
      <div className='text-sm mb-3 text-gray-500'>Чтобы добавить несколько одинаковых ингредиентов, нажмите на него несколько раз</div>
      <div className='flex flex-wrap gap-2 mb-4'>
        {ingredients.map(i => (
          <div
            key={i.name}
            className={`${addedIngredients.find(ing => ing.name === i.name) ? 'text-white bg-gray-500' : 'bg-gray-200 text-gray-600'} 
            rounded-2xl text-sm font-medium relative`}
            onClick={() => onAdd(i.name)}
          >
            <div className='px-4 py-1'>{i.name}</div>
            {addedIngredients.find(ing => ing.name === i.name) && (
              <div className='absolute top-0 right-0 flex items-center'>
                <div className='mr-2'>
                  +{addedIngredients.find(ing => ing.name === i.name)?.count}
                </div>
                <div onClick={() => deleteIngredient(i.name)}>
                  <CloseIcon className='h-7 w-7 fill-white bg-red-600 rounded-full p-1' />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default AdditionalIngredients