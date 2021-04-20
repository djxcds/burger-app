import React from 'react';
import { withRouter } from 'react-router-dom';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    const { ingredients } = props;
    let transformedIngredients = Object.entries(ingredients)
        .map(([key, value]) => {
            return [...Array(value)].map((_, i) => {
                return <BurgerIngredient key={key + i} type={key} />
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el) 
        }, []);
        const ingredientsLength = transformedIngredients.length;
    if (!ingredientsLength) {
        transformedIngredients = <p>Please start adding ingredients.</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default withRouter(burger);