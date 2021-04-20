import { ADD_INGREDIENTS, REMOVE_INGREDIENTS, FETCH_INGREDIENTS_FAILED, SET_INGREDIENTS } from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

const addIngredient = (state, action) => {
    const updatedIngredientOne = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
    };
    const updatedIngredients = updateObject(
    state.ingredients,
    updatedIngredientOne
    );
    return updateObject(state, {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true
    });
};

const removeIngredient = (state, action) => {
          return updateObject(state, {
            ingredients: {
              ...state.ingredients,
              [action.ingredientName]:
                state.ingredients[action.ingredientName] - 1,
            },
            totalPrice:
              state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
              building: true
          });
};

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, { error: true });
};

const setIngredients = (state, action) => {
          return updateObject(state, {
            ingredients: action.ingredients,
            error: false,
            totalPrice: 4,
            building: false
          });
};

const reducer = (state = initialState, action) => {
    const { type } = action;
    switch (type) {
      case ADD_INGREDIENTS: return addIngredient(state, action)
      case REMOVE_INGREDIENTS: return removeIngredient(state, action)
      case FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action); 
      case SET_INGREDIENTS: return setIngredients(state, action);
      default: return state;
    }
};

export default reducer;