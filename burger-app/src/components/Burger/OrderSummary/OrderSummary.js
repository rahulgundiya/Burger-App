import React, { Component } from 'react';
import ReactAux from '../../../hoc/ReactAux/ReactAux'
import Button from '../../UI/Button/Button'
class OrderSummary extends Component {

    componentDidUpdate()
    {
        console.log('[OrderSummary] DidUpdate');
    }
    
    render()
    {
        const ingredientSummary =Object.keys(this.props.ingredients)
        .map(igKey=>{
            //console.log("IgKey" ,igKey);
        return (
        <li key={igKey}>
            
            <span style={{textTransform:'capitalize'}}>
                {igKey}</span>:{this.props.ingredients[igKey]}</li>)
        })

        return(

            <ReactAux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
            {ingredientSummary}
            </ul>
    <p><strong>Total Price:{this.props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger"
             clicked={this.props.purchaseCancelled}>
                 CANCEL</Button>
            <Button btnType="Success" 
            clicked={this.props.purchaseContinued}>
                CONTINUE</Button> 
        </ReactAux>
            
        )
    }
}
  
    

export default OrderSummary;