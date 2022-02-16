import styles from './burger-ingredients.module.css';
import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import CardIngredients from '../card-ingredients/card-ingredients';

function BurgerIngredients() {
    const [currentTab, setCurrentTab] = React.useState("buns");
    const bunRef = React.useRef();
    const sauceRef = React.useRef();
    const mainRef = React.useRef();
    const { ingredients } = useSelector(store => store.ingredients);
    const bun = ingredients.filter((ingredient) => ingredient.type === "bun");
    const sauce = ingredients.filter((ingredient) => ingredient.type === "sauce");
    const main = ingredients.filter((ingredient) => ingredient.type === "main");

    const handleChangeTab = (e) => {
        const containerTop = e.target.getBoundingClientRect().top;
        const bunTop = bunRef.current.getBoundingClientRect().top;
        const sauceTop = sauceRef.current.getBoundingClientRect().top;
        const mainTop = mainRef.current.getBoundingClientRect().top;

        const offset = {
            "buns": Math.abs(bunTop - containerTop),
            "sauces": Math.abs(sauceTop - containerTop),
            "mains": Math.abs(mainTop - containerTop)
        };

        const activeTab = Object.keys(offset).reduce((prev, current) => offset[prev] < offset[current] ? prev : current);

        if (currentTab !== activeTab) {
            setCurrentTab(activeTab);
        }
    }

    const handleClickTab = (value) => {
        setCurrentTab(value);
        switch(value) {
            case "buns": {
                bunRef.current.scrollIntoView({ behavior: 'smooth' });
                break;
            }
            case "sauces": {
                sauceRef.current.scrollIntoView({ behavior: 'smooth' });
                break;
            }
            case "mains": {
                mainRef.current.scrollIntoView({ behavior: 'smooth' });
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
            <div className={styles.ingredients__container} onScroll={handleChangeTab}>
                <CardIngredients ingredients={bun} name="Булки" ref={bunRef} />
                <CardIngredients ingredients={sauce} name="Соусы" ref={sauceRef} />
                <CardIngredients ingredients={main} name="Начинки" ref={mainRef} />
            </div>
        </section>
    );
}

export default BurgerIngredients;