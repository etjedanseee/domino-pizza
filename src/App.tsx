import React, { useEffect } from 'react'
import PizzaItem from './components/PizzaItem'
import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';

function App() {
  const { pizzas, ingredients, loading } = useTypedSelector(state => state.pizza)
  const { fetchPizzas, fetchIngredients } = useActions()

  useEffect(() => {
    fetchPizzas()
    fetchIngredients()
  }, [])

  if (loading) {
    return <div className='text-3xl font-bold'>Loading...</div>
  }

  return (
    <div className='bg-slate-100 py-4 px-4'>
      <div className='grid grid-cols-4 gap-4'>
        {pizzas?.length > 0 && pizzas.map(pizza => (
          <PizzaItem
            pizza={pizza}
            ingredients={ingredients}
            key={pizza.id}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
