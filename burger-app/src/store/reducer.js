import * as actionTypes from '../store/action'

const initialState={
    ingredients:{
        cheese:0,
        meet:0,
        bacon:0,
        butter:0,
        salad:0
    },
    totalPrice:4
}
const reducer=(state=initialState,action)=>{
            switch(actionTypes)
            {
                case(actionTypes.ADD_INGREDIENT):
                 return{
                     ...state,
                     ingredients:{
                         ...state.ingredients,
                     [action.ingredientName]:state.ingredients[action.ingredientName]+1
                     }
                    }
                 case(actionTypes.REMOVE_INGREDIENT):
                 return{
                    ...state,
                    ingredients:{
                        ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1
                    }

                 }   
                 default:
                     return state

                }
}

export default reducer;