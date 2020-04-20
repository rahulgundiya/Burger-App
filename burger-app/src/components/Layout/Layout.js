import React from 'react'
import ReactAux from '../../hoc/ReactAux'
import classes from './Layout.module.css'
const layout = (props) => (
    <ReactAux>
    <div>ToolBar ,SideDrawer , Backdrop </div>
    <main className={classes.Content}> {props.children} </main>
    </ReactAux> 

    

)
export default layout;