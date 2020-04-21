import React , {Component} from 'react'
import ReactAux from '../../hoc/ReactAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls' 
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
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
    totalPrice: 4,
     purchasable:false,
     purchasing:false
}

updatePurchaseState(ingredients)
{
//     const ingredients = {
//     ...this.state.ingredients  
// }
const sum = Object.keys(ingredients)
.map((igKey)=>{

    return ingredients[igKey];

})
.reduce((sum ,el)=>{
    return sum+el;
} , 0) ;
this.setState({purchasable: sum > 0})
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
  
    this.updatePurchaseState(updatedIngredients)
    //console.log('setstate ' , this.setState);
}
removeIngredientHandler=(type)=>{

    const oldCount = this.state.ingredients[type];  
    if(oldCount <=0)
    {
        return;
    }
    const updatedCount = oldCount-1;                                                                                                             
    console.log('hii updatedcount' , updatedCount)
   
    const updatedIngredients = {               
        ...this.state.ingredients                 

    }
    console.log('UpdatedIngredients' ,  updatedIngredients)

    updatedIngredients[type] = updatedCount;
     const priceDeduction = INGREDIENT_PRICES[type];
     const oldPrice = this.state.totalPrice;
     const newPrice = oldPrice-priceDeduction;
    this.setState({totalPrice:newPrice , ingredients:updatedIngredients})
    this.updatePurchaseState(updatedIngredients)

}
 
 purchaseHandler=() =>
 {
     this.setState({purchasing:true})
 }
 purchaseCancelHandler=()=>{
     this.setState({purchasing:false})
 }
 purchaseContinueHandler=()=>{
     alert('You Continue')
 }
    render()
    {
const disabledInfo = {
    ...this.state.ingredients

}
for(let key in disabledInfo)
{
    disabledInfo[key] = disabledInfo[key] <= 0;
}

    //    console.log('hii state' , this.oldCount)
        return (
            <ReactAux>
                <Modal show ={this.state.purchasing}
                modalClosed={this.purchaseCancelHandler}>
                 <OrderSummary 
                 ingredients={this.state.ingredients}
                 purchaseCancelled={this.purchaseCancelHandler}
                 purchaseContinued ={this.purchaseContinueHandler}
                 />
               </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                ingredientAdded ={this.addIngredientHandler}
                ingredientRemoved ={this.removeIngredientHandler}
                disabled ={disabledInfo}
                purchasable={this.state.purchasable}
                ordered={this.purchaseHandler}
                price={this.state.totalPrice}
                />

            </ReactAux>
        )
    }
}
export default BurgerBuilder;