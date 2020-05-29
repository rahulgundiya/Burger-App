import * as actionTypes from '../actions/actionTypes'
//import axios from '../../axios-orders';
import { updateObject } from './utility'

let initialState={
    ingredients:null,
    totalPrice:0,
    error:false,
 INGREDIENT_PRICES:null
   

}
//let INGREDIENT_PRICES=null;
 
const addIngredient =(state, action)=>{
    console.log('Action' ,state);
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
    const updatedIngredients = updateObject( state.ingredients, updatedIngredient );
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + state.INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject( state, updatedState );
};
const removeIngredient =(state , action)=>{
    const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
    const updatedIngs = updateObject( state.ingredients, updatedIng );
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - state.INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject( state, updatedSt );
}
const setIngredients = (state, action) => {
    return updateObject( state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
            butter:action.ingredients.butter
        },
        totalPrice:0,
        error: false
    } );
};
const setTotalPrice=(state,action)=>{
   // console.log('Total Price Action' ,action.totalPrice);
    //console.log('Ingredient-Price' ,state.INGREDIENT_PRICES);
    return updateObject(state,{
        INGREDIENT_PRICES:
        {
            salad: action.totalPrice.salad,
            bacon: action.totalPrice.bacon,
            cheese: action.totalPrice.cheese,
            meat: action.totalPrice.meat,
            butter:action.totalPrice.butter
        }
        
    });
   
    
}
const fetchIngredientsFailed = (state, action) => {
    return updateObject( state, { error: true } );
};

console.log('Initial' , initialState);
const reducer=(state=initialState,action)=>{
            switch(action.type)
            {
                case(actionTypes.ADD_INGREDIENT):return addIngredient(state,action)
                 
                 case(actionTypes.REMOVE_INGREDIENT):return removeIngredient(state, action)
                 case actionTypes.SET_INGREDIENTS:return setIngredients(state,action)
                 case actionTypes.FETCH_INGREDIENTS_FAILED:return fetchIngredientsFailed(state,action)
                 case(actionTypes.SET_TOTALPRICE):return setTotalPrice(state ,action)
                 default:
                     return state

                }
}

export default reducer;