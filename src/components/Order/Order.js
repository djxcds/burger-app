import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
    const { price, ingredients } = props;

    const transformedIngredients = Object.entries(ingredients).map(([key, value], index) => {
        return (
          <span className={classes.Box} key={index}>
            {`${key} (${value})`}
          </span>
        );
    });
    console.log(transformedIngredients)

    return (
      <div className={classes.Order}>
        <p>Ingredients: {transformedIngredients}</p>
        <p>
          Price: <strong>{+price.toFixed(2)}</strong>
        </p>
      </div>
    );
};

export default order