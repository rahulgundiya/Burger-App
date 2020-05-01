import React from 'react'
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.module.css'
const checkoutSummary =(props)=>{
    return(
    <div className={classes.checkoutSummary}>
<h1>we hope it tastes well.!!</h1>
<div style={{width:'100%' , margin:"auto"}}>
    <Burger ingredients={props.ingredients}/>
</div>
<div className={classes.Button}>
<Button btnType="Danger"  clicked={props.checkoutCancelled}>CANCEL</Button>
<Button btnType="Success" clicked={props.checkoutContinued}>CONTINUE</Button>
</div>
</div>
    )
}

export default checkoutSummary;