import * as actionTypes from './action'
import axios from '../axios-orders';

let initialState={
    ingredients:{
        salad: 0,
        cheese: 0,
        meat: 0,
        bacon: 0,
        butter:0,
    },
    totalPrice:4
}
let INGREDIENT_PRICES ={
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
    butter:1,
};
// const myApi=()=>{
//     axios.get('https://burger-app-8f106.firebaseio.com/ingredients.json')
//     .then(res=>{
//         console.log('Res' , res.data)
//         initialState=res.data
//         console.log('Res InitailState' , initialState)

//     })
// }
console.log('Initial' , initialState);
const reducer=(state=initialState,action)=>{
            switch(action.type)
            {
                case(actionTypes.ADD_INGREDIENT):
                 return{
                     ...state,
                     ingredients:{
                         ...state.ingredients,
                     [action.ingredientName]:state.ingredients[action.ingredientName]+1
                     },
                     totalPrice:state.totalPrice+INGREDIENT_PRICES[action.ingredientName]
                    }
                 case(actionTypes.REMOVE_INGREDIENT):
                 return{
                    ...state,
                    ingredients:{
                        ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1
                    },
                    totalPrice:state.totalPrice-INGREDIENT_PRICES[action.ingredientName]

                 }   
                 default:
                     return state

                }
}

export default reducer;