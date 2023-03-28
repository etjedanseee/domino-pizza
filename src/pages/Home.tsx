import React, { useState, useEffect } from 'react'
import PizzaItem from '../components/PizzaItem'
import { useActions } from '../hooks/useActions'
import { IIngredient, IPizza } from '../types/Pizza/IPizza'

interface HomeProps {
  pizzas: IPizza[],
  ingredients: IIngredient[]
}

type sortPizzasByType = 'По умолчанию' | 'От дешевых' | 'От дорогих'

const Home = ({ pizzas, ingredients }: HomeProps) => {
  const [sortPizzasBy, setSortPizzasBy] = useState<sortPizzasByType>('По умолчанию')
  const [sortedPizzas, setSortedPizzas] = useState<IPizza[]>(pizzas)

  const sortPizzaByArr: sortPizzasByType[] = ['По умолчанию', 'От дешевых', 'От дорогих']

  const { showNotification } = useActions()

  const sortedIngredients = [...ingredients].sort((a, b) => a.name.localeCompare(b.name))

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
    <div className='container mx-auto py-20'>
      <div className='mb-3 px-4 flex gap-x-4'>
        {sortPizzaByArr.map(sort => (
          <div
            className={`${sortPizzasBy === sort ? 'text-black border-gray-300' : 'text-gray-400'} border-2 rounded-2xl px-4 py-1`}
            onClick={() => setSortPizzasBy(sort)}
            key={sort}
          >
            {sort}</div>
        ))}
      </div>

      <div className='grid grid-cols-4 gap-4'>
        {sortedPizzas?.length > 0 && sortedPizzas.map(pizza => (
          <PizzaItem
            pizza={pizza}
            ingredients={sortedIngredients}
            key={pizza.id}
            showNotification={showNotification}
          />
        ))}
      </div>
    </div>
  )
}

export default Home