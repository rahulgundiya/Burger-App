import React , { Component } from "react";
import Order from '../../components/order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component{
    state={
        orders:[],
        loading:true
    }
    componentDidMount(){
       const fetchedData =[];
        axios.get('https://burger-app-8f106.firebaseio.com/orders.json')
        .then(response=>{
         for(let key in response.data){
          fetchedData.push({
              ...response.data[key],
               id:key});
         }
            this.setState({loading:false , orders:fetchedData})
            
        })
        .catch(err=>{
            this.setState({loading:false});
        })
    }
    render(){
        return(
            <div>
                {this.state.orders.map((order)=>(
                    <Order key={order.id}
                    ingredients={order.ingredients}
                    price={+order.price}/>
        ))}
            </div>
        );
    }


}
export default withErrorHandler(Orders , axios);