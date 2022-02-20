import styles from './ingredient-constructor.module.css';
import React from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragPreviewImage, useDrag, useDrop } from "react-dnd";
import { ingredientPropTypes } from '../../utils/types';

function IngredientConstructor({ ingredient, index, onDelete, onMove }) {
    const { name, price, image, uuid } = ingredient;
    const ref = React.useRef(null);
    
    const [, dragRef, preview] = useDrag({
        type: "ingredient",
        item: {index}
    });

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        hover: (item) => {
            if (!ref.current) return;
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) return;
            onMove(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    });

    dragRef(dropTarget(ref));

    return (
        <li className={`${styles.constructor__item} `} ref={ref}>
            <DragPreviewImage connect={preview} src={image} />
            <DragIcon type="primary" />
            <ConstructorElement
                isLocked={false}
                text={name}
                price={price}
                thumbnail={image}
                handleClose={() => onDelete(uuid)}
            />
        </li>
    )
}

IngredientConstructor.propTypes = {
    ingredient: ingredientPropTypes.isRequired,
    index: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    onMove: PropTypes.func.isRequired
};

export default IngredientConstructor;