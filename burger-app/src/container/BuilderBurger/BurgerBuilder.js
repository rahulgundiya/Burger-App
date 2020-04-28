import React , {Component} from 'react'
import axios from '../../axios-orders';
import ReactAux from '../../hoc/ReactAux/ReactAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls' 
import Modal from '../../components/UI/Modal/Modal'
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
let INGREDIENT_PRICES = null;

class BurgerBuilder extends Component {
state ={
    ingredients:null ,
    totalPrice: 4,
     purchasable:false,
     purchasing:false,
     loading:false ,
     error:false,
     totalError:false
}
componentDidMount()
{
 axios.get('https://burger-app-8f106.firebaseio.com/ingredients.json')
.then(response=>{
    this.setState({ingredients:response.data})

})
.catch(error=>{
    this.setState({error:error})

})
axios.get('https://burger-app-8f106.firebaseio.com/totalPrice.json')
.then(response=>{
   // this.setState({totalPrice:response.data})
   INGREDIENT_PRICES=response.data;
   console.log('Total Price' , INGREDIENT_PRICES);

 })
.catch(error=>{
     this.setState({totalError:error})
 })
 
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
    //console.log('hii updatedcount' , updatedCount)
   
    const updatedIngredients = {                // and pass to the oldCount
        ...this.state.ingredients                 

    }
    //console.log('UpdatedIngredients' ,  updatedIngredients)

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
    //console.log('UpdatedIngredients' ,  updatedIngredients)

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
     //alert('You Continue')
     this.setState({loading:true})
     const order = {
         ingredients:this.state.ingredients,
         price:this.state.totalPrice.toFixed(),
         customer:{
             name:'Rahul',
             address:{
                 street:'GandhiChok',
                 zipCode:456001,
                 country:'India'
             },
             email:'rahulgundiya28@gmail.com'
         },
         deliveryMethod:'fastest'
     }
     axios.post('/orders.json' , order)
     .then(response=>{
        this.setState({loading:false , purchasing:false})
     })
     .catch(error=>{
        this.setState({loading:false , purchasing:false})
     })
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
let orderSummary=null;
// burger =this.state.totalError?<p>Network Error</p>:<Spinner/>
let burger= this.state.error?<p>Ingredients can't be loaded</p>:<Spinner/>
if(this.state.ingredients)
    {
 burger= ( 
    <ReactAux>
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
 
orderSummary=
<OrderSummary 
ingredients={this.state.ingredients}
purchaseCancelled={this.purchaseCancelHandler}
purchaseContinued ={this.purchaseContinueHandler}
price={this.state.totalPrice}
/>
}
    
if(this.state.loading)
{
orderSummary = <Spinner/>
}
  
    //    console.log('hii state' , this.oldCount)
        return (
            <ReactAux>
                <Modal show ={this.state.purchasing}
                modalClosed={this.purchaseCancelHandler}>
               {orderSummary}
               </Modal>
               {burger}
            </ReactAux>
        )
    }
}
export default withErrorHandler(BurgerBuilder , axios);