import React from 'react'
import PizzaItem from '../components/PizzaItem'
import { useActions } from '../hooks/useActions'
import { IIngredient, IPizza } from '../types/Pizza/IPizza'

interface HomeProps {
  pizzas: IPizza[],
  ingredients: IIngredient[]
}

const Home = ({ pizzas, ingredients }: HomeProps) => {
  const { addPizzaToBasket } = useActions()

  return (
    <div className='pt-14 grid grid-cols-4 gap-4'>
      {pizzas?.length > 0 && pizzas.map(pizza => (
        <PizzaItem
          pizza={pizza}
          ingredients={ingredients}
          key={pizza.id}
          addPizzaToBasket={addPizzaToBasket}
        />
      ))}
    </div>
  )
}

export default Home