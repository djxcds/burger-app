import React, { Component } from 'react'

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import { instance as axios } from '../../axios/orders';
import { spinner as Spinner } from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: null,
  };
  _unMounted = false;

  componentDidMount() {
      console.log('BURGER BUILDER DIDMOUNT')
      this._unMounted = true;
      axios.get('/ingredients.json').then(response => {
        const isIngredientSet = !!Object.entries(response.data).reduce(
            (prevVal, [key, value]) => {
            return prevVal + value;
            },
            0
        );

        if (this._unMounted) {
            this.setState({
                ingredients: response.data,
                purchasable: isIngredientSet,
            });
        }
      }).catch(error => {
          if (this._unMounted) {
            this.setState({ error: true });
          }
      });
  }

  componentWillUnmount() {
this._unMounted = false;
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.entries(ingredients)
      .map(([key, value]) => {
        return value;
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum >= 1 });
  };

  addIngredientHandler = (type) => {
    const { ingredients, totalPrice } = this.state;
    const oldCount = ingredients[type];
    const updatedCounted = oldCount + 1;
    const updatedIngredients = {
      ...ingredients,
    };
    updatedIngredients[type] = updatedCounted;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const { ingredients, totalPrice } = this.state;
    const oldCount = ingredients[type];
    if (!oldCount) return;
    const updatedCounted = oldCount - 1;
    const updatedIngredients = {
      ...ingredients,
    };
    updatedIngredients[type] = updatedCounted;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = async () => {
    const { ingredients, totalPrice } = this.state;
    const queryParams = [];
    for (const key in ingredients) {
      queryParams.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(ingredients[key])}`
      );
    }
    queryParams.push(`price=${totalPrice}`);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: `?${queryString}`,
    });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    const {
      ingredients,
      totalPrice,
      purchasable,
      purchasing,
      loading,
      error,
    } = this.state;
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

    if (ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={ingredients} />
          <BurgerControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo} 
            price={totalPrice}
            ordered={this.purchaseHandler}
            purchasable={purchasable}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={ingredients}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={totalPrice}
        />
      );
    }
    if (loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios)