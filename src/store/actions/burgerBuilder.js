import { ADD_INGREDIENTS, REMOVE_INGREDIENTS, SET_INGREDIENTS, FETCH_INGREDIENTS_FAILED } from './actionTypes';
import { ordersInstance as axios } from '../../axios/orders';

const addIngredients = (ingredientName) => {
  return {
    type: ADD_INGREDIENTS,
    ingredientName,
  };
};

const removeIngredients = (ingredientName) => {
  return {
    type: REMOVE_INGREDIENTS,
    ingredientName,
  };
};

const setIngredients = ingredients => {
    return {
        type: SET_INGREDIENTS,
        ingredients
    }
};

const fetchIngredientsFailed = () => {
    return {
      type: FETCH_INGREDIENTS_FAILED,
    };
};

const initIngredients = () => {
    return async (dispatch, getState) => {
        try {
            const { data } = await axios.get('/ingredients.json')
            dispatch(setIngredients(data));
        } catch (error) {
            dispatch(fetchIngredientsFailed());
        }
    }
};

export { addIngredients, removeIngredients, initIngredients };
