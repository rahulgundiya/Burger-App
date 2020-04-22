import React, { Component } from 'react'
import ReactAux from '../../hoc/ReactAux'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import classes from './Layout.module.css'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
class Layout extends Component {
    state={
        showSlideDrawer:true
    }
    sideDrawerClosedHandler=()=>{
     this.setState({showSlideDrawer:false})
    }
    render(){
        return(
            <ReactAux>
            <Toolbar />
            <SideDrawer 
            open={this.state.showSlideDrawer}
            closed={this.sideDrawerClosedHandler}/>
             <main className={classes.Content}> 
             {this.props.children} </main>
             </ReactAux> 
         

        )
    }
}
    
    

export default Layout;