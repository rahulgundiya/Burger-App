import React, {Component} from 'react';
//import classes from './App.module.css';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder'
import Checkout from './container/Checkout/Checkout'
import {Route , Switch} from 'react-router-dom'
class  App extends Component {
  // state ={
  //   show:true
  // }
  // componentDidMount()
  // {
  //   setTimeout(()=>{
  //     this.setState({show:false})
  //   },5000);
  
  // }
  render() {  
  

   return (
    <div >
      <Layout> 
        <Switch>
        <Route path = "/checkout"  component={Checkout}/>
        <Route path = "/" exact component={BurgerBuilder}/>
       </Switch>
        {/* <BurgerBuilder/> 
        <Checkout/> */}
       {/* { this.state.show?<BurgerBuilder/>:null } */}
      </Layout>
       </div>
   )
}
}

export default App;
