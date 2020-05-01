import React ,{Component} from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './Contactdata.module.css'

class Contactdata extends Component{
    state={
        name:'',
        email:'',
        address:{
            street:'',
            postalcode:''
        }
    }
    render()
    {
        return(
            <div className={classes.Contactdata}>
                <h4>Enter Your Contact Data</h4>
                <form>
                    <input className={classes.Input} type="text" name="name"
                     placeholder="Enter Your Name"/>
                      <input type="email" className={classes.Input} name="email"
                     placeholder="Enter Your Email"/>
                      <input type="text" className={classes.Input} name="street"
                     placeholder="Enter Your Street"/>
                      <input type="text" className={classes.Input} name="postal"
                     placeholder="Enter Your Postal"/>
                     <Button btnType="Success">ORDER</Button>

                </form>
            </div>
        )
    }
}

export default Contactdata;