import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { ordersInstance as axios } from '../../../axios/orders';
import classes from './ContactData.module.css';
import { spinner as Spinner } from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { purchaseBurger } from '../../../store/actions/index';
import {
  createElement,
  updateObject,
  checkValidity,
} from '../../../shared/utility';

class ContactData extends Component {
  state = {
    orderForm: {
      name: createElement({
        type: 'input',
        configType: 'text',
        placeholder: 'Your Name',
        value: '',
      }),
      street: createElement({
        type: 'input',
        configType: 'text',
        placeholder: 'Your Street',
        value: '',
      }),
      zipCode: createElement({
        type: 'input',
        configType: 'text',
        placeholder: 'ZIP Code',
        value: '',
        lengthInfo: {
          maxLength: 5,
          minLength: 3,
        },
      }),
      country: createElement({
        type: 'input',
        configType: 'text',
        placeholder: 'Country',
        value: '',
      }),
      email: createElement({
        type: 'email',
        configType: 'text',
        placeholder: 'Your E-Mail',
        value: '',
        required: true
      }),
      deliveryMethod: createElement({
        type: 'select',
        configType: 'text',
        placeholder: 'Your Name',
        value: 'express',
        required: false,
        options: [
          { value: 'express', displayValue: 'Express' },
          { value: 'standard', displayValue: 'Standard' },
        ],
        valid: true
      }),
    },
    formIsValid: false,
  };

  orderHandler = event => {
      event.preventDefault();

     const { onOrderBurger, token } = this.props;
      const { orderForm } = this.state;
      const formData = {};
      for (const [key, { value }] of Object.entries(orderForm)) {
        formData[key] = value;
      }
      const { ings: ingredients, price, userId } = this.props;
      const order = {
        ingredients,
        price,
        orderData: formData,
        userId
      };

      onOrderBurger(order, token);
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const { orderForm } = this.state;

    const updatedFormElement = updateObject(orderForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        orderForm[inputIdentifier].validation
      ),
      touched: true,
    });
    const updatedOrderForm = updateObject(orderForm, {
      [inputIdentifier]: updatedFormElement,
    });    
    let formIsValid = true;
    for (const [ ,{ valid }] of Object.entries(orderForm)) {
      formIsValid = valid && formIsValid;
    }
    this.setState(state =>{
        return { orderForm: updatedOrderForm, formIsValid };
    });
  };

  render() {
    const { loading } = this.props;
    const { orderForm, formIsValid } = this.state;
    const formElementsArray = Object.entries(orderForm).map(([key, value]) => {
      const {
        elementType,
        elementConfig,
        value: val,
        options,
        valid,
        validation,
        touched,
      } = value;
      return (
        <Input
          key={key}
          elementType={elementType}
          elementConfig={elementConfig}
          value={val}
          valueType={key}
          options={options}
          invalid={!valid}
          shouldValidate={validation}
          changed={(event) => this.inputChangedHandler(event, key)}
          touched={touched}
        />
      );
    });

    const form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray}
        <Button btnType="Success" disabled={!formIsValid}>
          ORDER
        </Button>
      </form>
    );
    const view = loading ? <Spinner /> : form;

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {view}
      </div>
    );
  }
}

const mapStateToProps = state => {
    const { ingredients, totalPrice } = state.burgerBuilder;
    const { loading, orders } = state.order;
    const { token, userId } = state.auth;
  return {
    ings: ingredients,
    price: totalPrice,
    loading,
    orders,
    token,
    userId
  };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => {
            dispatch(purchaseBurger(orderData, token))
        },
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(withRouter(ContactData), axios));