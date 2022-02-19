import styles from './burger-constructor.module.css';
import React from 'react';
import uuid from 'react-uuid';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from "react-dnd";
import { postOrder } from '../../services/actions/order';
import { addIngredient, removeIngredient, moveIngredient } from '../../services/actions/constructor';
import IngredientConstructor from '../ingredient-constructor/ingredient-constructor';

function BurgerConstructor() {
    const dispatch = useDispatch();
    const { ingredientsConstructor } = useSelector(store => store.constructor);
    const { orderRequest, orderFailed } = useSelector(store => store.order);
    const bunIngredient = ingredientsConstructor?.find(ingredient => ingredient.type === 'bun');
    const otherIngredients = ingredientsConstructor?.filter(ingredient => ingredient.type !== 'bun');

    const totalPrice = React.useMemo(
        () =>
            ingredientsConstructor
            ? ingredientsConstructor.reduce((sum, current) => sum + current.price, 0)
            : 0,
        [ingredientsConstructor]
    );

    const handleDrop = (ingredient) => {
        if (ingredient.type === "bun" && bunIngredient) {
            dispatch(removeIngredient(bunIngredient.uuid));
        } 
        dispatch(addIngredient(ingredient, uuid()));
    };

    const [{ isDrop }, dropTarget] = useDrop({
        accept: "ingredients",
        drop: (ingredient) => {
            handleDrop(ingredient);
        },
        collect: (monitor) => ({
            isDrop: monitor.isOver(),
        }),
    });

    const handleRemoveIngredient = (uuid) => {
        dispatch(removeIngredient(uuid));
    }

    const handleOrder = React.useCallback(() => {
        const burgerIngredients = ingredientsConstructor.map(((item) => item._id));
        dispatch(postOrder(burgerIngredients)); 
    }, [dispatch, ingredientsConstructor]);

    const handleMoveIngredient = React.useCallback((dragIndex, hoverIndex) => {
        dispatch(moveIngredient(dragIndex, hoverIndex));
    }, [dispatch]);

    const classNameContainer = `${styles.constructor__container}
                                ${!ingredientsConstructor?.length && styles.constructor__initial}
                                ${isDrop && styles.constructor__drop}`

    const disabledButton = !ingredientsConstructor?.length || !bunIngredient || orderRequest;

    return (
        <section className={styles.constructor}>
            <div className={classNameContainer} ref={dropTarget}>
                <div className={styles.constructor__bun}>
                    {
                        bunIngredient
                        ? <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${bunIngredient.name} (верх)`}
                            price={bunIngredient.price}
                            thumbnail={bunIngredient.image}
                        />
                        : !orderFailed && 
                        <div className={styles.constructor__bunInitial}>
                            <p className="text text_type_main-default">Выберите булочку</p>
                        </div>
                    }
                </div>
                <ul className={styles.constructor__list}>
                    { otherIngredients &&
                        otherIngredients.map((ingredient, index) => (
                            <IngredientConstructor
                                ingredient={ingredient}
                                key={ingredient.uuid}
                                index={index}
                                onDelete={handleRemoveIngredient}
                                onMove={handleMoveIngredient}
                            />
                        ))
                    }
                    { orderFailed && 
                        <div className={styles.constructor__listFailed}>
                            <p className="text text_type_main-default">При формировании заказа произошла ошибка. Попробуйте ещё раз</p>
                        </div>
                    }
                </ul>
                <div className={styles.constructor__bun}>
                    {
                        bunIngredient
                        ? <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${bunIngredient.name} (низ)`}
                            price={bunIngredient.price}
                            thumbnail={bunIngredient.image}
                        />
                        : !orderFailed &&
                        <div className={styles.constructor__bunInitial}>
                            <p className="text text_type_main-default">Выберите булочку</p>
                        </div>
                    }
                </div>
            </div>
            <div className={styles.constructor__total}>
                <div className={styles.constructor__price}>
                    <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="medium" onClick={handleOrder} disabled={disabledButton}>
                    {orderRequest ? "Формирование заказа" : "Оформить заказ"}
                </Button>
            </div>
        </section>
    );
}

export default BurgerConstructor;