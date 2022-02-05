import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import styles from './app.module.css';
import { API_URL } from '../../utils/constants';

function App() {
  const [ingredients, setIngredients] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentModal, setCurrentModal] = React.useState('');
  const [currentIngredient, setCurrentIngredient] = React.useState({});
  
  React.useEffect(() => {
    fetch(`${API_URL}/ingredients`)
      .then((res) => {
        if (res.ok) {
          return res.json();
      } else {
          return Promise.reject(`Ошибка ${res.status}`);
      }})
      .then((res) => {
        setIngredients(res.data);
      })
      .catch((err) => console.log(err));
  }, [])

  const openModalOrderDetails = () => {
    setIsModalOpen(true);
    setCurrentModal('orderDetails');
  }

  const openModalIngredientDetails = (id) => {
    if (ingredients) {
      setCurrentIngredient(ingredients.find((ingredient) => ingredient._id === id));
    }
    setIsModalOpen(true);
    setCurrentModal('ingredientDetails');
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.page__burger}>
        <BurgerIngredients ingredients={ingredients} onOpen={openModalIngredientDetails} />
        <BurgerConstructor ingredients={ingredients} onOpen={openModalOrderDetails} />
      </main>
      { isModalOpen &&
          <Modal onClose={closeModal} header={`${currentModal === 'ingredientDetails' ? "Детали ингредиента" : ""}`}>
            { currentModal === 'ingredientDetails'
              ? <IngredientDetails ingredient={currentIngredient} />
              : <OrderDetails />
            }
          </Modal>
      }
    </div>
  );
}

export default App;
