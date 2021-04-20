import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import { spinner as Spinner } from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { addIngredients, removeIngredients, initIngredients, purchaseInit, setAuthRedirectPath } from '../../store/actions/index';
import { ordersInstance as axios } from '../../axios/orders';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
      const { onInitIngredients } = this.props;
      onInitIngredients();
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.entries(ingredients)
      .map(([key, value]) => {
        return value;
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum >= 1;
  };

  purchaseHandler = () => {
      const { isAuthenticated, history } = this.props;
      if (isAuthenticated) {
            this.setState({ purchasing: true })
      } else {
          const { onSetAuthRedirectPath } = this.props;
          onSetAuthRedirectPath('/checkout');
          history.push('/auth');
      };
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = async () => {
      const { onInitPurchase } = this.props;
      onInitPurchase();
    this.props.history.push('/checkout',
    );
  };

  render() {
    const {
      ings,
      onIngredientAdded,
      onIngredientRemoved,
      price,
      error,
      isAuthenticated
    } = this.props;
    const disabledInfo = {
      ...ings,
    };
    const { purchasing } = this.state;
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

    if (ings) {
      burger = (
        <Aux>
          <Burger ingredients={ings} />
          <BurgerControls
            ingredientAdded={onIngredientAdded}
            ingredientRemoved={onIngredientRemoved}
            disabled={disabledInfo}
            price={price}
            ordered={this.purchaseHandler}
            purchasable={this.updatePurchaseState(ings)}
            isAuth={isAuthenticated}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={ings}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={price}
        />
      );
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

const mapStateToProps = state => {
    const { ingredients, totalPrice, error, purchasable } = state.burgerBuilder;
    const { token } = state.auth;
    return {
      ings: ingredients,
      price: totalPrice,
      error,
      purchasable,
      isAuthenticated: token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
      onIngredientAdded: (ingName) =>
        dispatch(addIngredients(ingName)),
      onIngredientRemoved: (ingName) =>
        dispatch(removeIngredients(ingName)),
      onInitIngredients: () => {
          dispatch(initIngredients());
      },
      onInitPurchase: () => {
          dispatch(purchaseInit())
      },
      onSetAuthRedirectPath: (path) => 
            dispatch(setAuthRedirectPath(path))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))