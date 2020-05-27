import React,{Component} from 'react';
import {Route ,Redirect} from 'react-router-dom'
import Contactdata from './Contactdata/Contactdata'
import CheckoutSummary from '../../components/order/CheckoutSummary/CheckoutSummary'
import {connect} from 'react-redux'
class Checkout extends Component{
    
    checkoutCancelledHandler=()=>{
      this.props.history.goBack();
    }
    checkoutContinuedHandler=()=>{
    this.props.history.replace('/checkout/contact-data')
    }
   
render()
{
    let summary=<Redirect to="/" />
    if (this.props.ings){
        summary= ( 
            <div>
            <CheckoutSummary ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler} />
            <Route path= { this.props.match.path + '/contact-data'}
            component={Contactdata} />
            </div> )
    }
    //console.log('Contact-data' , this.state.ingredients)
    //console.log('Contact-data' , this.state.totalPrice)
    return summary;
}
}
const mapStateToProps=(state)=>{
    return {
        ings:state.ingredients
    }


}


export default connect(mapStateToProps)(Checkout);