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
                        placeholder:'Your-Email'
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

        }
    },

        loading:false
    
    }
    orderHandler=(event)=>{
        event.preventDefault();
       // console.log("Ingredients" ,this.props.ingredients)
       const formData= {};
       for(let formElementIdentifier in this.state.orderForm)
       {
           formData[formElementIdentifier]=this.state.orderForm[formElementIdentifier].value;
          console.log('FormData' , formData[formElementIdentifier])
       
        }

         this.setState({loading:true})
     const order = {
         ingredients:this.props.ingredients,
         price:this.props.price,
         orderData:formData
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
    inputChangedHandler=(event, inputIdentifier )=>{
        //console.log(event.target.value);
        const updatedOrderForm={
            ...this.state.orderForm
        };
      const updatedFormElement =
      {...updatedOrderForm[inputIdentifier]

      }
      updatedFormElement.value=event.target.value;
      updatedOrderForm[inputIdentifier]=updatedFormElement;
      this.setState({orderForm:updatedOrderForm});
    }


    render()
    {
    const formElemtentsArray=[];
    for(let key in this.state.orderForm)
    {
        formElemtentsArray.push({
            id:key,
            config:this.state.orderForm[key]
        })
    }
        let form =( <form onSubmit={this.orderHandler}>

            {formElemtentsArray.map(formElement=>(
                //console.log('Value' , formElement.config.elementConfig)
            <Input key = {formElement.id}
             elementType={formElement.config.elementType}
             elementConfig={formElement.config.elementConfig}
             value={formElement.config.value}
             changed={(event)=>this.inputChangedHandler(event ,
                 formElement.id)}
                />
            ))}
            <Button btnType="Success" >ORDER</Button>

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