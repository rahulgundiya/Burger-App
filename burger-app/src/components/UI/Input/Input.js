import React from 'react'
import classes from './Input.module.css';
const input = (props) =>{
    let inputElement = null; 
    let validationError=null; 
    console.log("error message" ,props.errorMessage)
    const inputClasses =[classes.InputElement];
    if(props.invalid && props.shouldValidate &&props.touched){
    validationError=<p className={classes.ValidationError}>Please enter a {props.errorMessage}</p>
        inputClasses.push(classes.Invalid)
       // console.log("error message" ,props.errorMessage)
        
    }
    
    
    switch(props.elementType){
        case('input'):
        inputElement =<input 
        className={inputClasses.join(' ')}
        {...props.elementConfig}
         value={props.value}
          onChange={props.changed}  />
        break;
        case('textarea'):
        inputElement=<textarea 
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}  />
        break;
        case('select'):
        inputElement=
        (<select
        className={inputClasses.join(' ')}
        value={props.value} onChange={props.changed}   >{
        props.elementConfig.options.map(option=>(
         <option key={option.value} >
             {option.displayValue}
         </option>
        ))}</select>
        )
        break;
        default:
            inputElement=<input 
            className={inputClasses.join(' ')}
            {...props.elementConfig} 
            onChange={props.changed}  
            value={props.value} 
             />
    }
    return(
        <div className={classes.Input}>
            <label className={classes.Label}>
                {props.label}
            </label>
            {inputElement}
            {validationError}
        </div>
    )
}

export default input;