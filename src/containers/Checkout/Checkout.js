import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    mounted = false;
  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0,
    },
    totalPrice: 0,
  };

  componentDidMount() {
      try {
          console.log('CHECKOUT DIDMOUNT');
        this.mounted = true;
        const { search } = this.props.location;
        const query = new URLSearchParams(search);
        const ingredients = {};
        let price = 0;
        for (const [key, value] of query.entries()) {
            if (key === 'price') {
                price = +value;
            } else {
                ingredients[key] = +value;
            }
        }
        if (this.mounted) {
            this.setState({ ingredients, totalPrice: price });
        }        
      } catch (error) {
           console.log('ERROR');  
      }
  }

  componentWillUnmount() {
      this.mounted = false;
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinued = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    const { ingredients, totalPrice } = this.state;
    const { path } = this.props.match;
    return (
      <div>
        <CheckoutSummary
          ingredients={ingredients}
          checkoutContinued={this.checkoutContinued}
          onCheckoutCancelled={this.checkoutCancelledHandler}
        />
        <Route
          path={`${path}/contact-data`}
          render={() => (
            <ContactData ingredients={ingredients} price={totalPrice} />
          )}
        />
      </div>
    );
  }
}

export default Checkout;