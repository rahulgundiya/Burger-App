import React from 'react'
import ReactAux from '../../hoc/ReactAux'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import classes from './Layout.module.css'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
const layout = (props) => (
    <ReactAux>
   <Toolbar />
   <SideDrawer/>
    <main className={classes.Content}> {props.children} </main>
    </ReactAux> 

    

)
export default layout;