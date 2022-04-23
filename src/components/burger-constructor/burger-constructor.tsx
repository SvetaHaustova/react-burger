import styles from './burger-constructor.module.css';
import React, { FC } from 'react';
import uuid from 'react-uuid';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop } from "react-dnd";
import { postOrder } from '../../services/actions/order';
import { addIngredient, removeIngredient, moveIngredient } from '../../services/actions/constructor';
import IngredientConstructor from '../ingredient-constructor/ingredient-constructor';
import { errorTextOrder } from '../../utils/constants';
import { useHistory } from 'react-router-dom';
import { TIngredient } from '../../utils/types';
import { useDispatch, useSelector } from '../../services/hooks';

const BurgerConstructor: FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { ingredientsConstructor } = useSelector((store) => store.constructor);
    const { orderRequest, orderFailed } = useSelector((store) => store.order);
    const { loggedIn } = useSelector((store) => store.auth);
    
    const bunIngredient = React.useMemo(
        () => 
            ingredientsConstructor?.find((ingredient) => ingredient.type === 'bun'), 
        [ingredientsConstructor]
    );
    
    const otherIngredients = React.useMemo(
        () => 
            ingredientsConstructor?.filter((ingredient) => ingredient.type !== 'bun'),
        [ingredientsConstructor]
    );

    const totalPrice = React.useMemo(
        () =>
            ingredientsConstructor
            ? ingredientsConstructor.reduce((sum, current) => sum + current.price, 0)
            : 0,
        [ingredientsConstructor]
    );

    const handleDrop = (ingredient: TIngredient) => {
        if (ingredient.type === "bun" && bunIngredient && bunIngredient.uuid !== undefined) {
            dispatch(removeIngredient(bunIngredient.uuid));
        } 
        dispatch(addIngredient(ingredient, uuid()));
    };

    const [{ isDrop }, dropTarget] = useDrop({
        accept: "ingredients",
        drop: (ingredient: TIngredient) => {
            handleDrop(ingredient);
        },
        collect: (monitor) => ({
            isDrop: monitor.isOver(),
        }),
    });

    const handleRemoveIngredient = (uuid: string) => {
        dispatch(removeIngredient(uuid));
    }

    const handleOrder = React.useCallback(() => {
        if (loggedIn) {
            const burgerIngredients = ingredientsConstructor.map(((item) => item._id));
            dispatch(postOrder(burgerIngredients));
        } else {
            history.push("/login");
        }
    }, [dispatch, ingredientsConstructor, loggedIn, history]);

    const handleMoveIngredient = React.useCallback((dragIndex: number, hoverIndex: number) => {
        dispatch(moveIngredient(dragIndex, hoverIndex));
    }, [dispatch]);

    const classNameContainer = `${styles.constructor__container}
                                ${!ingredientsConstructor?.length && styles.constructor__initial}
                                ${isDrop && styles.constructor__drop}`;

    const disabledButton = !ingredientsConstructor?.length || !bunIngredient || orderRequest;

    return (
        <section className={styles.constructor}>
            <div className={classNameContainer} ref={dropTarget} data-test="constructor">
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
                        : (!orderFailed || (!bunIngredient && otherIngredients.length > 0)) &&
                        <div className={styles.constructor__bunInitial}>
                            <p className="text text_type_main-default">Выберите булочку</p>
                        </div>
                    }
                </div>
                <ul className={styles.constructor__list}>
                    { otherIngredients &&
                        otherIngredients.map((ingredient: TIngredient, index: number) => (
                            <IngredientConstructor
                                ingredient={ingredient}
                                key={ingredient.uuid}
                                index={index}
                                onDelete={handleRemoveIngredient}
                                onMove={handleMoveIngredient}
                            />
                        ))
                    }
                    { orderFailed && ingredientsConstructor.length === 0 &&
                        <div className={styles.constructor__listFailed}>
                            <p className="text text_type_main-default">{errorTextOrder}</p>
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
                        : (!orderFailed || (!bunIngredient && otherIngredients.length > 0)) &&
                        <div className={styles.constructor__bunInitial}>
                            <p className="text text_type_main-default">Выберите булочку</p>
                        </div>
                    }
                </div>
            </div>
            <div className={styles.constructor__total}>
                <div className={styles.constructor__price}>
                    <p className="text text_type_digits-medium mr-2" data-test="order-price">{totalPrice}</p>
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