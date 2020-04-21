import React , {Component} from 'react'
import ReactAux from '../../hoc/ReactAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls' 

const INGREDIENT_PRICES = {
    salad:0.2,
    bacon:0.4,
    cheese:0.6,
    meat:1.6
}

class BurgerBuilder extends Component {
state ={
    ingredients:{
        salad:0,
        bacon:0 ,
        cheese:0,
        meat:0
    } ,
    totalPrice: 4
}

addIngredientHandler=(type)=>{
    const oldCount = this.state.ingredients[type];   //type of ingredient are 
    const updatedCount = oldCount+1;               //in ingredients                        
    console.log('hii updatedcount' , updatedCount)
   
    const updatedIngredients = {                // and pass to the oldCount
        ...this.state.ingredients                 

    }
    console.log('UpdatedIngredients' ,  updatedIngredients)

    updatedIngredients[type] = updatedCount;
     const priceAddition = INGREDIENT_PRICES[type];
     const oldPrice = this.state.totalPrice;
     const newPrice = oldPrice+priceAddition;
    this.setState({totalPrice:newPrice , ingredients:updatedIngredients})

    //console.log('setstate ' , this.setState);
}
removeIngredientHandler=(type)=>{

}
 
    render()
    {

    //    console.log('hii state' , this.oldCount)
        return (
            <ReactAux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                ingredientAdded ={this.addIngredientHandler}
                />

            </ReactAux>
        )
    }
}
export default BurgerBuilder;