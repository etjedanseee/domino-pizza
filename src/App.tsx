import React, { useEffect } from 'react'
import { Route } from 'react-router';
import { Routes } from 'react-router-dom';
import HomeMenu from './components/HeaderMenu';
import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';
import Basket from './pages/Basket';
import Home from './pages/Home';

//добавить юсэффект где брать с куки данные о авторизации и если их нет редирект на регистр/вход
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
              <HomeMenu basketCount={basketCount} isGoBackVisible={false} />
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
              <HomeMenu basketCount={basketCount} isGoBackVisible={true} />
              <Basket />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
