import styles from './ingredient-constructor.module.css';
import React, { FC } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragPreviewImage, useDrag, useDrop } from "react-dnd";
import { TIngredient, TIngredientConstructorComponent } from '../../utils/types';

const IngredientConstructor: FC<TIngredientConstructorComponent> = ({ ingredient, index, onDelete, onMove }) => {
    const { name, price, image, uuid } = ingredient;
    const ref = React.useRef<HTMLLIElement>(null);
    
    const [, dragRef, preview] = useDrag({
        type: "ingredient",
        item: { index }
    });

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        hover: (item: TIngredient & { index: number }) => {
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
                handleClose={() => {
                    if (uuid !== undefined) {
                        onDelete(uuid) 
                    }
                }}
            />
        </li>
    )
}

export default IngredientConstructor;