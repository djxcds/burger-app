import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import { ordersInstance as axios } from '../../axios/orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { fetchOrders } from '../../store/actions/index';
import { connect } from 'react-redux';
import { spinner as Spinner } from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

class Orders extends Component {
    state = {
        loading: true
    }
    componentDidMount() {
        const { onFetchOrders, token, isAuthenticated, history, userId } = this.props;
        if (!isAuthenticated) {return history.push('/')};
        isAuthenticated && onFetchOrders(token, userId);
    }

    render () {
        const { orders, loading, isAuthenticated } = this.props;
        const authRedirect = !isAuthenticated ? <Redirect to="/"/> : null;
        const list = orders.map((order) => {
          const { id, ingredients, price } = order;
          return <Order key={id} ingredients={ingredients} price={price} />;
        });
        const view = loading ? <Spinner /> : list;
        return (
          <div>
            {authRedirect}
            {view}
          </div>
        );
    }
}

const mapStateToProps = state => {
    const { orders, loading } = state.order;
    const { token, userId } = state.auth;
    return {
      orders,
      loading,
      token,
      isAuthenticated: token !== null,
      userId,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => {
            dispatch(fetchOrders(token, userId));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));