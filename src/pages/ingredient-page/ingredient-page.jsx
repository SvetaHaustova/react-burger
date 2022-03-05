import React from 'react';
import styles from '../page.module.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';

export function IngredientPage() {
    const { id } = useParams();
    const { ingredients } = useSelector(store => store.ingredients);
    const currentIngredient = React.useMemo(
            () => ingredients.find((item) => item._id === id),
        [ingredients, id]);

    return (
        <main className={styles.main}>
            <h2 className={styles.main__title}>Детали ингредиента</h2>
            {currentIngredient && <IngredientDetails />}
        </main>
    )
}