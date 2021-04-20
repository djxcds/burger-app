import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinued = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    let summary = <Redirect to="/" />;
    const { ings: ingredients, purchased } = this.props;
    const { path } = this.props.match;
    
    if (ingredients) {
        const purchaseRedirect = purchased ? <Redirect to="/" />: null;
        summary = (
          <div>
            {purchaseRedirect}
            <CheckoutSummary
              ingredients={ingredients}
              checkoutContinued={this.checkoutContinued}
              onCheckoutCancelled={this.checkoutCancelledHandler}
            />
            <Route path={`${path}/contact-data`} component={ContactData} />
          </div>
        );
    }
    return summary
  }
}

const mapStateToProps = state => {
    const { ingredients } = state.burgerBuilder;
    const { purchased } = state.order;
    return {
        ings: ingredients,
        purchased
    }
};


export default connect(mapStateToProps)(Checkout);