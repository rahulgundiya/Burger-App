import React ,{Component} from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './Contactdata.module.css'
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner'

class Contactdata extends Component{
    state={
        name:'',
        email:'',
        address:{
            street:'',
            postalcode:''
        } ,
        loading:false
    }
    orderHandler=(event)=>{
        event.preventDefault();
        console.log("Ingredients" ,this.props.ingredients)
         this.setState({loading:true})
     const order = {
         ingredients:this.props.ingredients,
         price:this.props.price,
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
        this.setState({loading:false })
        this.props.history.push('/');
     })
     .catch(error=>{
        this.setState({loading:false  })
     })
    }
    render()
    {
        let form =( <form>
            <input className={classes.Input} type="text" name="name"
             placeholder="Enter Your Name"/>
              <input type="email" className={classes.Input} name="email"
             placeholder="Enter Your Email"/>
              <input type="text" className={classes.Input} name="street"
             placeholder="Enter Your Street"/>
              <input type="text" className={classes.Input} name="postal"
             placeholder="Enter Your Postal"/>
             <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>

        </form>);
        if(this.state.loading)
        {
            form=<Spinner/>
        }
        return(
            <div className={classes.Contactdata}>
                <h4>Enter Your Contact Data</h4>
               {form}
            </div>
        )
    }
}

export default Contactdata;