import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import { withRouter } from 'react-router-dom';

import { instance as axios } from '../../../axios/orders';
import classes from './ContactData.module.css';
import { spinner as Spinner } from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  createElement = ({
    type = 'input',
    configType = 'text',
    placeholder = '',
    value = '',
    options = [],
  }) => {
    return {
      elementType: type,
      elementConfig: {
        type: configType,
        placeholder,
      },
      value,
      options,
    };
  };

  state = {
    orderForm: {
      name: this.createElement({
        type: 'input',
        configType: 'text',
        placeholder: 'Your Name',
        value: '',
      }),
      street: this.createElement({
        type: 'input',
        configType: 'text',
        placeholder: 'Your Street',
        value: '',
      }),
      zipCode: this.createElement({
        type: 'input',
        configType: 'text',
        placeholder: 'ZIP Code',
        value: '',
      }),
      country: this.createElement({
        type: 'input',
        configType: 'text',
        placeholder: 'Country',
        value: '',
      }),
      email: this.createElement({
        type: 'email',
        configType: 'text',
        placeholder: 'Your E-Mail',
        value: '',
      }),
      deliveryMethod: this.createElement({
        type: 'select',
        configType: 'text',
        placeholder: 'Your Name',
        value: 'express',
        options: [
          { value: 'express', displayValue: 'Express' },
          { value: 'standard', displayValue: 'Standard' },
        ],
      }),
    },
    loading: false,
  };

  orderHandler = async (event) => {
      try {
          event.preventDefault();
          this.setState({ loading: true });
          const { orderForm } = this.state;
          const formData = {};
          for (const [key, { value }] of Object.entries(orderForm)) {
              formData[key] = value;
          }
          const { ingredients, price } = this.props;
          const order = {
            ingredients,
            price,
            orderData: formData
          };
          await axios.post('/orders.json', order)
            this.setState({ loading: false });
            this.props.history.push('/');
      } catch (error) {
          console.log(error);
          this.setState({ loading: false });
      }
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
        ...this.state.orderForm
    }
    const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
    updatedFormElement.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({ orderForm: updatedOrderForm });
  };

  render() {
    const { loading, orderForm } = this.state;
    const formElementsArray = Object.entries(orderForm).map(([key, value]) => {
      // return { id: key, config: value };
      const { elementType, elementConfig, value: val, options } = value;
      return (
        <Input
          key={key}
          elementType={elementType}
          elementConfig={elementConfig}
          value={val}
          options={options}
          changed={(event) => this.inputChangedHandler(event, key)}
        />
      );
    });

    const form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray}
        <Button btnType="Success">ORDER</Button>
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

export default withRouter(ContactData);