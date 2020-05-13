import React from 'react'
import classes from './Order.module.css'

const order=(props)=>{
    const ingredients=[];
    for(let ingredientName in props.ingredients)
    {
        ingredients.push({
            name:ingredientName,
            ammout:props.ingredients[ingredientName]
        })


    }
       const ingredientOutput = ingredients.map(ig=>{
            return<span style={{
                margin:'0 8px',
                textTransform:'capitalize',
                display:'inline-block',
                border:'1px solid #ccc',
                padding : '5px'
            }} key={ig.name}>{ig.name} ({ig.ammout})</span>
        })


    
    return(<div className={classes.Order}>
        <p>{ingredientOutput}</p>
<p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p> 

    </div>
)
    }
    
    


export default order;