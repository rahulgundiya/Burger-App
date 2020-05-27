import React ,{Component} from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './Contactdata.module.css'
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import {connect} from 'react-redux' 
import * as action from '../../../store/actions/Index'
import  withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
class Contactdata extends Component{
    state={
        orderForm:{
                name:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your name'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                    },
                street:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your Street'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                    },
                zipCode:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'ZIP Code'
                    },
                    value:'',
                    validation:{
                     required:true,
                     maxLength:6,
                     minLength:5
                    },
                    valid:false,
                    touched:false
                    
                    },
                country:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Country'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                    },
                  email:{
                    elementType:'input',
                    elementConfig:{
                        type:'email',
                        placeholder:'Your-Email'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false

            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest' , displayValue:'Fastest'},
                        {value:'cheapest' , displayValue:'Cheapest'}
                    ]
                },
                validation:{},
                value:'Fastest',
                valid:true
             }
            },
                 formIsValid:false,
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

         
     const order = {
         ingredients:this.props.ings,
         price:this.props.price,
         orderData:formData
     }
     this.props.onOrderBurger(order);
    
    }
    checkValidity(value , rules){
        let isValid=true;
        if(!rules){
            return true;
        }
        if(rules.required)
        {
         isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength)
        {
            isValid = value.length >= rules.minLength &&isValid
        }
        if(rules.maxLength)
        {
            isValid=value.length <= rules.maxLength && isValid
        }
        return isValid;

    } 
    inputChangedHandler=(event, inputIdentifier )=>{
       // console.log('InputHandler' ,event.target.value);
     const updatedOrderForm={
            ...this.state.orderForm
        };
      const updatedFormElement =
      {...updatedOrderForm[inputIdentifier]

      }
      updatedFormElement.value=event.target.value;
      updatedFormElement.valid = this.checkValidity(updatedFormElement.value
         ,updatedFormElement.validation);
      updatedFormElement.touched=true;
      //console.log('Touched' , updatedFormElement.touched)
      //console.log('Validation' , updatedFormElement)
      updatedOrderForm[inputIdentifier]=updatedFormElement;
      let formIsValid=true;
      for(let inputIdentifier in updatedOrderForm)
      {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
      }
      this.setState({orderForm:updatedOrderForm , formIsValid:formIsValid});
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
            <Input key = {formElement.id}
             elementType={formElement.config.elementType}
             elementConfig={formElement.config.elementConfig}
             value={formElement.config.value}
             invalid = {!formElement.config.valid}
             shouldValidated={formElement.config.validation}  
             touched={formElement.config.touched}
             errorMessage = {formElement.config.elementConfig.placeholder}
             changed={(event)=>this.inputChangedHandler(event ,
                 formElement.id)}
              
           
                />
                 
            ))}
            <Button btnType="Success" disabled={!this.state.formIsValid} >ORDER</Button>

        </form>);
        if(this.props.loading)
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
const mapStateToProps=(state)=>{
    return {
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading

    }
}

const mapDispatchToProps=dispatch=>{
   return { onOrderBurger:(orderData)=>dispatch(action.purchaseBurger(orderData))
}
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Contactdata ,axios));