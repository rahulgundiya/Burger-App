import React,{Component} from 'react';
import {Route} from 'react-router-dom'
import Contactdata from './Contactdata/Contactdata'
import CheckoutSummary from '../../components/order/CheckoutSummary/CheckoutSummary'
class Checkout extends Component{
    state={
        ingredients:null,
        totalPrice:0
    }
    checkoutCancelledHandler=()=>{
      this.props.history.goBack();
    }
    checkoutContinuedHandler=()=>{
    this.props.history.replace('/checkout/contact-data')
    }
    componentWillMount() {
        let price=0;
       const query = new URLSearchParams(this.props.location.search);
      // console.log('Query' , query.entries());
        const ingredients = {};
        for (let param of query.entries()) {
            // ['salad', '1']
            if(param[0] ==='price'){
                price =param[1];
                console.log('Params' , param[0])
            }
            else {
                ingredients[param[0]]= +param[1];
                console.log('MyParam' , ingredients[param[0]])

            }
        }
            
        this.setState({ingredients: ingredients , totalPrice:price});
    }
render()
{
    //console.log('Contact-data' , this.state.ingredients)
    //console.log('Contact-data' , this.state.totalPrice)
    return(
        <div>
            <CheckoutSummary ingredients={this.state.ingredients}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler} />
            <Route path= { this.props.match.path + '/contact-data'}
             render={(props)=>(<Contactdata ingredients={this.state.ingredients}
                price={this.state.totalPrice} {...props}
             />)}
            />
        </div>
    )
}
}

export default Checkout;