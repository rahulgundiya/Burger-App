import React , {Component} from 'react'
import {connect} from 'react-redux'
import axios from '../../axios-orders';
import ReactAux from '../../hoc/ReactAux/ReactAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls' 
import Modal from '../../components/UI/Modal/Modal'
import Spinner from '../../components/UI/Spinner/Spinner';
import * as burgerBuilderActions from '../../store/actions/Index'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
class BurgerBuilder extends Component {
state ={
     purchasable:false,
     purchasing:false,
     loading:false ,
     error:false,
     totalError:false
}
componentDidMount()
{
    console.log('my' , this.props)

axios.get('https://burger-app-8f106.firebaseio.com/totalPrice.json')
.then(response=>{
   // this.setState({totalPrice:response.data})
  this.props.ingPrice=response.data;
   console.log('Total Price' , this.props.ingPrice);

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
return sum > 0
}
 
 purchaseHandler=() =>
 {
     this.setState({purchasing:true})
 }
 purchaseCancelHandler=()=>{
     this.setState({purchasing:false})
 }
 purchaseContinueHandler=()=>{
     //alert('You Continue'  
 this.props.history.push('/checkout');
}
    render()
    {
const disabledInfo = {
    ...this.props.ings
}
for(let key in disabledInfo)
{
    disabledInfo[key] = disabledInfo[key] <= 0;
}
let orderSummary=null;
// burger =this.state.totalError?<p>Network Error</p>:<Spinner/>
let burger= this.state.error?<p>Ingredients can't be loaded</p>:<Spinner/>
if(this.props.ings)
    {
 burger= ( 
    <ReactAux>
    <Burger ingredients={this.props.ings} />
    <BuildControls 
    ingredientAdded ={this.props.onIngredientAdd}
    ingredientRemoved ={this.props.onIngredientRemoved}
    disabled ={disabledInfo}
    purchasable={this.updatePurchaseState(this.props.ings)}
    ordered={this.purchaseHandler}
    price={this.props.ingPrice}
    />
    </ReactAux>
    
)
 
orderSummary=
<OrderSummary 
ingredients={this.props.ings}
purchaseCancelled={this.purchaseCancelHandler}
purchaseContinued ={this.purchaseContinueHandler}
price={this.props.ingPrice}
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
const mapStateToProps=state=>{
    return {
        ings: state.ingredients,
        ingPrice:state.totalPrice
    }

}
const mapDispatchToProps=dispatch=>{
    return {
        onIngredientAdd:(ingName)=>
 dispatch(burgerBuilderActions.addIngredient(ingName)),
 onIngredientRemoved:(ingName)=>
 dispatch(burgerBuilderActions.removeIngredient(ingName))
        
    }

    }
export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder , axios));