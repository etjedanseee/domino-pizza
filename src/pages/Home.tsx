import PizzaItem from '../components/PizzaItem'
import { useActions } from '../hooks/useActions'
import { IIngredient, IPizza } from '../types/Pizza/IPizza'

interface HomeProps {
  pizzas: IPizza[],
  ingredients: IIngredient[]
}

const Home = ({ pizzas, ingredients }: HomeProps) => {
  const { showNotification } = useActions()

  return (
    <div className='container mx-auto py-20 grid grid-cols-4 gap-4'>
      {pizzas?.length > 0 && pizzas.map(pizza => (
        <PizzaItem
          pizza={pizza}
          ingredients={ingredients}
          key={pizza.id}
          showNotification={showNotification}
        />
      ))}
    </div>
  )
}

export default Home