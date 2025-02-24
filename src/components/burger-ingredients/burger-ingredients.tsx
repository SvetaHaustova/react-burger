import styles from './burger-ingredients.module.css';
import React, { FC } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import CardIngredients from '../card-ingredients/card-ingredients';
import { TIngredient } from '../../utils/types';
import { useSelector } from '../../services/hooks';

const BurgerIngredients: FC = () => {
    const [currentTab, setCurrentTab] = React.useState<string>("buns");
    const containerRef = React.useRef<HTMLDivElement>(null);
    const bunRef = React.useRef<HTMLDivElement>(null);
    const sauceRef = React.useRef<HTMLDivElement>(null);
    const mainRef = React.useRef<HTMLDivElement>(null);
    const { ingredients } = useSelector((store) => store.ingredients);
    const bun = React.useMemo(() => ingredients.filter((ingredient) => ingredient.type === "bun"), [ingredients]);
    const sauce = React.useMemo(() => ingredients.filter((ingredient) => ingredient.type === "sauce"), [ingredients]);
    const main = React.useMemo(() => ingredients.filter((ingredient) => ingredient.type === "main"), [ingredients]);

    const handleChangeTab = () => {
        const containerTop = containerRef.current?.getBoundingClientRect().top as number;
        const bunTop = bunRef.current?.getBoundingClientRect().top as number;
        const sauceTop = sauceRef.current?.getBoundingClientRect().top as number;
        const mainTop = mainRef.current?.getBoundingClientRect().top as number;

        const offset: { [key: string]: number } = {
            "buns": Math.abs(bunTop - containerTop),
            "sauces": Math.abs(sauceTop - containerTop),
            "mains": Math.abs(mainTop - containerTop)
        };

        const activeTab = Object.keys(offset).reduce((prev: string, current: string) => offset[prev] < offset[current] ? prev : current);

        if (currentTab !== activeTab) {
            setCurrentTab(activeTab);
        }
    }

    const handleClickTab = (value: string) => {
        setCurrentTab(value);
        switch(value) {
            case "buns": {
                bunRef.current?.scrollIntoView({ behavior: 'smooth' });
                break;
            }
            case "sauces": {
                sauceRef.current?.scrollIntoView({ behavior: 'smooth' });
                break;
            }
            case "mains": {
                mainRef.current?.scrollIntoView({ behavior: 'smooth' });
                break;
            }
            default:
                break;
        }  
    }

    return (
        <section className={styles.ingredients}>
            <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <div style={{ display: 'flex' }}>
                <Tab value="buns" active={currentTab === "buns"} onClick={handleClickTab}>Булки</Tab>
                <Tab value="sauces" active={currentTab === "sauces"} onClick={handleClickTab}>Соусы</Tab>
                <Tab value="mains" active={currentTab === "mains"} onClick={handleClickTab}>Начинки</Tab>
            </div>
            <div className={styles.ingredients__container} onScroll={handleChangeTab} ref={containerRef}>
                <CardIngredients ingredients={bun} name="Булки" ref={bunRef} />
                <CardIngredients ingredients={sauce} name="Соусы" ref={sauceRef} />
                <CardIngredients ingredients={main} name="Начинки" ref={mainRef} />
            </div>
        </section>
    );
}

export default BurgerIngredients;