import React, { useState, useEffect } from 'react'
import { IIngredient, IPizza } from '../types/Pizza/IPizza'
import SelectButton from '../UI/SelectButton'
import AdditionalIngredients from './AdditionalIngredients'
import { ReactComponent as CheeseIcon } from '../assets/cheese.svg'
import { ReactComponent as ArrowDown } from '../assets/arrow.svg'
import PizzaIcon from '../assets/pizza.svg'
import AddButton from '../UI/AddButton'
import Modal from '../UI/Modal'
import { IBasketItem } from '../types/Basket/IBasket'

interface IPizzaProps {
  pizza: IPizza,
  ingredients: IIngredient[],
  addPizzaToBasket: (pizza: IBasketItem) => void
}

const PizzaItem = ({ pizza, ingredients, addPizzaToBasket }: IPizzaProps) => {
  const [pizzaInfoVisible, setPizzaInfoVisible] = useState(false)
  const [addIngredientsVisible, setAddIngredientsVisible] = useState(false)
  const [selectedSize, setSelectedSize] = useState(pizza.sizes[0])
  const [selectedDough, setSelectedDough] = useState(pizza.dough[0])
  const [selectDoughVisible, setSelectDoughVisible] = useState(false)
  const [addedIngredients, setAddedIngredients] = useState<IIngredient[]>([])
  const [totalPrice, setTotalPrice] = useState(pizza.sizesPrice[0])
  const [addedIngrSum, setAddedIngrSum] = useState(0)


  const handleInfoVisible = () => {
    setPizzaInfoVisible(!pizzaInfoVisible)
  }

  const handleAddIngredientsVisible = () => {
    setAddIngredientsVisible(!addIngredientsVisible)
  }

  const changeSize = (size: number) => {
    setSelectedSize(size)
  }

  const handleSelectDoughVisible = () => {
    setSelectDoughVisible(!selectDoughVisible)
  }

  const changeSelectDough = (dough: string) => {
    setSelectedDough(dough)
    handleSelectDoughVisible()
  }

  const addToBasket = () => {
    handleInfoVisible()
    setAddedIngrSum(0)
    setAddedIngredients([])
    setSelectedSize(pizza.sizes[0])
    setSelectedDough(pizza.dough[0])

    const res = {
      id: Date.now(),
      name: pizza.name,
      size: selectedSize,
      dough: selectedDough,
      ingredients: pizza.ingredients,
      addedIngredients: addedIngredients,
      totalPrice: totalPrice
    }

    addPizzaToBasket(res)
  }

  const changeAddedIngredients = (addedIngr: IIngredient[]) => {
    setAddedIngredients(addedIngr)
  }

  const updatePrice = (addedPrice: number) => {
    handleAddIngredientsVisible()
    setAddedIngrSum(addedPrice)
  }

  useEffect(() => {
    const currentSizeIndex = pizza.sizes.findIndex(size => size === selectedSize) || 0
    setTotalPrice(pizza.sizesPrice[currentSizeIndex] + addedIngrSum)
  }, [selectedSize, addedIngrSum])

  return (
    <div className='relative px-4 py-4 border flex flex-col items-center rounded-2xl bg-white'>
      <img
        src={pizza.image}
        alt={pizza.name}
        onClick={handleInfoVisible}
      />
      <div>
        {pizzaInfoVisible
          ? (
            <div className='absolute left-0 bottom-0 px-4 py-4 bg-opacity-90 bg-white'>
              <div className='text-gray-700 text-xl font-medium mb-1'>{pizza.name}</div>
              <div className='text-sm text-gray-500 mb-4'>{pizza.ingredients.join(', ')}</div>

              <div
                className='flex items-center gap-x-2 mb-4'
                onClick={handleAddIngredientsVisible}
              >
                <CheeseIcon className='h-6' />
                <div className='text-xs text-gray-700 font-medium'>Ингредиенты</div>
              </div>

              {addIngredientsVisible && (
                <Modal>
                  <AdditionalIngredients
                    ingredients={ingredients}
                    pizzaIngredients={pizza.ingredients}
                    addedIngredients={addedIngredients}
                    changeAddedIngredients={changeAddedIngredients}
                    updatePrice={updatePrice}
                  />
                </Modal>
              )}

              <div className='w-full flex justify-between text-center font-medium rounded-2xl bg-gray-200 mb-4'>
                {pizza.sizes.map(size => (
                  <div
                    key={size}
                    className={`
                      ${selectedSize === size ? 'bg-gray-500 text-white' : 'text-gray-700'} 
                      flex-1 px-4 py-1 duration-500 transition-colors rounded-2xl`}
                    onClick={() => changeSize(size)}
                  >
                    {size} см
                  </div>
                ))}
              </div>

              <div className='relative'>
                <div
                  className='flex justify-between items-center bg-gray-200 rounded-2xl px-6 py-1 mb-4'
                  onClick={handleSelectDoughVisible}
                >
                  <div className='flex-initial text-gray-700 font-medium'>{selectedDough}</div>
                  <ArrowDown className='h-4 w-4 fill-gray-700 mt-1' />
                </div>

                {selectDoughVisible && (
                  <div className='absolute bottom-full w-full bg-white bg-opacity-90 p-2 rounded-2xl border-2 border-gray-300 mb-2'>
                    {pizza.dough.map(d => (
                      <div
                        key={d}
                        onClick={() => changeSelectDough(d)}
                        className='flex justify-between items-center py-2 text-gray-700'
                      >
                        <div className='flex items-center gap-x-2'>
                          <img
                            src={PizzaIcon}
                            className={`${selectedDough === d ? 'border-red-600 border-2 bg-red-200' : 'bg-gray-200'}
                              h-12 rounded-full p-1`
                            }
                            alt="pizza icon"
                          />
                          <div className={`${selectedDough === d ? 'text-red-600' : 'text-gray-700'} font-medium`}>{d}</div>
                        </div>
                        <div className='font-bold'>+ 0 руб</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <AddButton title='В корзину' price={totalPrice} onClick={addToBasket} />
            </div>
          )
          : (
            <>
              <div className='text-gray-700 text-xl font-medium mb-1'>{pizza.name}</div>
              <div className='text-sm text-gray-500 mb-5'>{pizza.ingredients.join(', ')}</div>
              <div className='flex items-center justify-between'>
                <SelectButton onClick={handleInfoVisible} />
                <div className='font-bold text-lg'>от {pizza.sizesPrice[0]} ₽</div>
              </div>
            </>
          )}
      </div>
    </div>
  )
}

export default PizzaItem