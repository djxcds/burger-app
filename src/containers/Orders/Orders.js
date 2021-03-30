import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import { instance as axios } from '../../axios/orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }
    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
              const orders = Object.entries(res.data).map(([key, value]) => {
                  return { ...value, id: key }
              });
              console.log(orders)
              this.setState({ loading: false, orders });
            })
            .catch(error => {
                this.setState({ loading: false });
            })
    }

    render () {
        const { orders } = this.state;
        return (
          <div>
            {orders.map(order => {
                const { id, ingredients, price } = order;
               return <Order key={id} ingredients={ingredients} price={price} />; 
            })}
          </div>
        );
    }
}

export default withErrorHandler(Orders, axios);