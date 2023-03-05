import React, { useEffect } from 'react'
import { Route } from 'react-router';
import { Routes } from 'react-router-dom';
import HomeMenu from './components/HomeMenu';
import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';
import Basket from './pages/Basket';
import Home from './pages/Home';

function App() {
  const { pizzas, ingredients, loading } = useTypedSelector(state => state.pizza)
  const { count: basketCount } = useTypedSelector(state => state.basket)
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
      <Routes>
        <Route
          path='/'
          element={
            <>
              <HomeMenu basketCount={basketCount} />
              <Home
                ingredients={ingredients}
                pizzas={pizzas}
              />
            </>
          }
        />
        <Route
          path='/basket'
          element={
            <>
              <HomeMenu basketCount={basketCount} />
              <Basket />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
