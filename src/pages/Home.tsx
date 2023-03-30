import React, { useState, useEffect } from 'react'
import PizzaItem from '../components/PizzaItem'
import { useActions } from '../hooks/useActions'
import { IIngredient, IPizza, sortPizzasByType } from '../types/Pizza/IPizza'
import { ReactComponent as ChevronIcon } from '../assets/chevron.svg'
interface HomeProps {
  pizzas: IPizza[],
  ingredients: IIngredient[]
}

const Home = ({ pizzas, ingredients }: HomeProps) => {
  const [sortPizzasBy, setSortPizzasBy] = useState<sortPizzasByType>('По умолчанию')
  const [sortedPizzas, setSortedPizzas] = useState<IPizza[]>(pizzas)

  const sortPizzaByArr: sortPizzasByType[] = ['По умолчанию', 'От дешевых', 'От дорогих']

  const { showNotification } = useActions()

  const sortedIngredients = [...ingredients].sort((a, b) => a.name.localeCompare(b.name))

  const onleadUp = () => {
    window.scrollTo({ behavior: 'smooth', top: 0 })
  }

  useEffect(() => {
    if (sortPizzasBy === 'По умолчанию') {
      setSortedPizzas([...pizzas])
    } else if (sortPizzasBy === 'От дешевых') {
      setSortedPizzas([...pizzas].sort((a, b) => a.sizesPrice[0] - b.sizesPrice[0]))
    } else {
      setSortedPizzas([...pizzas].sort((a, b) => b.sizesPrice[0] - a.sizesPrice[0]))
    }
  }, [sortPizzasBy, pizzas])

  return (
    <div className='container mx-auto xs:py-20 py-16 max-lg:max-w-none'>
      <div className='flex xs:px-4 xs:gap-x-4 gap-x-2 mb-3 pt-2 justify-center xs:justify-start'>
        {sortPizzaByArr.map(sort => (
          <div
            className={`${sortPizzasBy === sort
              ? 'text-black border-gray-300' : 'text-gray-400'} 
              border-2 rounded-2xl sm:px-4 sm:text-base text-xs px-2 py-1`
            }
            onClick={() => setSortPizzasBy(sort)}
            key={sort}
          >
            {sort}</div>
        ))}
      </div>

      <div className='grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4'>
        {sortedPizzas?.length > 0 && sortedPizzas.map(pizza => (
          <PizzaItem
            pizza={pizza}
            ingredients={sortedIngredients}
            key={pizza.id}
            showNotification={showNotification}
          />
        ))}
      </div>

      <div className='fixed bottom-3 right-3' onClick={onleadUp}>
        <ChevronIcon className='h-8 w-8' />
      </div>

    </div>
  )
}

export default Home