import {
  PURCHASE_BURGER_FAIL,
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_START,
  PURCHASE_INIT,
  FETCH_ORDERS_FAIL,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_START
} from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
  error: false
};

const purchaseBurgerFail = (state, action) => {
        return updateObject(state, {
        loading: false,
        });
};

const purchaseBurgerSuccess = (state, action) => {
        const newOrder = {
          ...action.orderData,
          id: action.orderId,
        };
        return updateObject(state, {
          loading: false,
          orders: [...state.orders, { ...newOrder }],
          purchased: true,
        });
};

const purchaseBurgerStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const purchaseInit = (state, action) => {
    return updateObject(state, { purchased: false });
};

const fetchOrdersStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const fetchOrderSuccess = (state, action) => {
              return updateObject(state, {
                orders: action.orders,
                loading: false,
              });
};

const fetchOrderFail = (state, action) => {
    return updateObject(state, { error: true, loading: false });
};

const reducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state, action)
    case PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action)
    case PURCHASE_BURGER_START: return purchaseBurgerStart(state, action)
    case PURCHASE_INIT: return purchaseInit(state, action);
    case FETCH_ORDERS_START:  return fetchOrdersStart(state, action)
    case FETCH_ORDERS_SUCCESS: return fetchOrderSuccess(state, action)
    case FETCH_ORDERS_FAIL: return fetchOrderFail(state, action)
    default: return state;
  }
};

export default reducer;
