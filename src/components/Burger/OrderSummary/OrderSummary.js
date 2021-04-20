import React, { Component } from 'react';

import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    componentDidUpdate() {

    }

    render () {
        const { ingredients, purchaseCancelled, purchaseContinued, price } = this.props;
        const ingredientSummary = Object.entries(ingredients).map(([key, value]) => {
            return (
            <li key={key}>
                <span style={{ textTransform: 'capitalize' }}>
                    {key}
                </span>: 
                <span>
                    {value}
                </span>
            </li>
            )
        });

        return (
            <Aux>
                <h3>
                    Your Order
                </h3>
                <p>
                    A delicious burger with the following ingredients:
                </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Total Price: <strong>{price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={purchaseContinued}>CONTINUE</Button>
            </Aux>
        )
    }
}

export default OrderSummary;