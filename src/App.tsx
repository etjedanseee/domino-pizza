import React, { useEffect } from 'react'
import { Route } from 'react-router';
import { Routes } from 'react-router-dom';
import HomeMenu from './components/HeaderMenu';
import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';
import Basket from './pages/Basket';
import Home from './pages/Home';
import Notification from './UI/Notification';

//добавить юсэффект где брать с куки данные о авторизации и если их нет редирект на регистр/вход
function App() {
  const { pizzas, ingredients, loading } = useTypedSelector(state => state.pizza)
  const { count: basketCount } = useTypedSelector(state => state.basket)
  const { notifications } = useTypedSelector(state => state.notification)
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
      <div className='fixed z-50 top-3 right-3 flex flex-col'>
        {notifications.map(n => (
          <Notification key={n.id} color={n.color} text={n.text} />
        ))}
      </div>

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
