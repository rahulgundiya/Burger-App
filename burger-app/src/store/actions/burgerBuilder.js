import * as actionTypes from './actionTypes'

export const addIngredient=(name)=>{
    console.log('Name' ,name)
    return {
        type:actionTypes.ADD_INGREDIENT,
        ingredientName:name
    }
}

export const removeIngredient=(name)=>{
    console.log('Name' ,name)
    return {
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName:name
    }
}