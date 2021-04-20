import {
    PURCHASE_BURGER_FAIL,
    PURCHASE_BURGER_SUCCESS,
    PURCHASE_BURGER_START,
    PURCHASE_INIT,
    FETCH_ORDERS_FAIL,
    FETCH_ORDERS_START,
    FETCH_ORDERS_SUCCESS
} from './actionTypes';
import { ordersInstance as axios } from '../../axios/orders';

const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData
    }
};

const purchaseBurgerFail = (error) => {
    return {
        type: PURCHASE_BURGER_FAIL,
        error
    }
};

const purchaseBurgerStart = () => {
    return {
      type: PURCHASE_BURGER_START,
    };
};

const purchaseBurger = (orderData, token) => {
    return async (dispatch) => {
        try {
            dispatch(purchaseBurgerStart());
            const { data: { name } } = await axios.post(`/orders.json?auth=${token}`, orderData);
            dispatch(purchaseBurgerSuccess(name, orderData));
        } catch (error) {
            dispatch(purchaseBurgerFail(error));
        }
    } ;
};

const purchaseInit = () => {
    return {
        type: PURCHASE_INIT
    };
};

const fetchOrdersSuccess = (orders) => {
    return {
        type: FETCH_ORDERS_SUCCESS,
        orders
    };
};

const fetchOrdersFailed = (error) => {
    return {
        type: FETCH_ORDERS_FAIL,
        error
    };
};

const fetchOrdersStart = () => {
    return {
        type: FETCH_ORDERS_START
    };
};

const fetchOrders = (token, userId) => {
  return async (dispatch) => {
    try {
        dispatch(fetchOrdersStart());
        const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
        const { data } = await axios.get(`/orders.json${queryParams}`);
        const orders = data ? Object.entries(data).map(([key, value]) => {
          return { ...value, id: key };
        }) : [];
      dispatch(fetchOrdersSuccess(orders));
    } catch (error) {
      dispatch(fetchOrdersFailed(error));
    }
  };
};

export {
  purchaseBurgerSuccess,
  purchaseBurgerFail,
  purchaseBurger,
  purchaseInit,
  fetchOrdersSuccess,
  fetchOrdersFailed,
  fetchOrders,
  fetchOrdersStart,
};
