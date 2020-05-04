import React ,{Component} from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './Contactdata.module.css'
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
class Contactdata extends Component{
    state={
        orderForm:{
                name:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your name'
                    },
                    value:''
                    },
                street:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your Street'
                    },
                    value:''
                    },
                zipCode:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'ZIP Code'
                    },
                    value:''
                    }
                },
                country:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Country'
                    },
                    value:''
                    },
                  email:{
                    elementType:'input',
                    elementConfig:{
                        type:'email',
                        placeholder:'Email'
                    },
                    value:''

            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest' , displayValue:'Fastest'},
                        {value:'cheapest' , displayValue:'Cheapest'}
                    ]
                },
                value:''

        },
        loading:false
    }
    orderHandler=(event)=>{
        event.preventDefault();
        console.log("Ingredients" ,this.props.ingredients)
         this.setState({loading:true})
     const order = {
         ingredients:this.props.ingredients,
         price:this.props.price,
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
            <Input  elementType=".." elementConfig=".." value="..."/>
            <Input />
            <Input />
            <Input />
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