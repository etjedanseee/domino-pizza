import React, { useEffect } from 'react'
import { Route } from 'react-router';
import { Routes } from 'react-router-dom';
import HomeMenu from './components/HeaderMenu';
import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';
import Basket from './pages/Basket';
import Home from './pages/Home';
import UserOrders from './pages/UserOrders';
import Notification from './UI/Notification';

function App() {
  const { pizzas, ingredients, loading } = useTypedSelector(state => state.pizza)
  const { count: basketCount, items } = useTypedSelector(state => state.basket)
  const { user } = useTypedSelector(state => state.auth)
  const { notifications } = useTypedSelector(state => state.notification)
  const { fetchPizzas, fetchIngredients, setUser, setBasketItems } = useActions()

  useEffect(() => {
    const localUser = localStorage.getItem('user')
    if (localUser && !user) {
      setUser(JSON.parse(localUser))
    } else if (user && !localUser) {
      localStorage.setItem('user', JSON.stringify(user))
    }
  }, [user])

  useEffect(() => {
    fetchPizzas()
    fetchIngredients()

    const localItems = localStorage.getItem('basket')
    if (localItems) {
      setBasketItems(JSON.parse(localItems))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(items))
  }, [items])

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
        <Route
          path='/orders'
          element={
            <>
              <HomeMenu basketCount={basketCount} isGoBackVisible={true} />
              <UserOrders />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
