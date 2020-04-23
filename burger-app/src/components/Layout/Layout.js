import React, { Component } from 'react'
import ReactAux from '../../hoc/ReactAux'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import classes from './Layout.module.css'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
class Layout extends Component {
    state={
        showSlideDrawer:false
    }
    sideDrawerClosedHandler=()=>{
     this.setState({showSlideDrawer:false})
    }
    sideDrawerToggleHandler=()=>{
        this.setState((prevState)=>{
          return   {showSlideDrawer:!prevState.showSlideDrawer}
        })
    }
    render(){
        return(
            <ReactAux>
            <Toolbar
             drawerToggleClicked={this.sideDrawerToggleHandler} />
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