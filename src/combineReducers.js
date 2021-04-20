import { combineReducers } from 'redux';

import reducerBurgerBuilder from './store/reducers/burgerBuilder';
import reducerOrder from './store/reducers/order';
import reducerAuth from './store/reducers/auth';

const reducer = combineReducers({
  burgerBuilder: reducerBurgerBuilder,
  order: reducerOrder,
  auth: reducerAuth
});

export { reducer };
