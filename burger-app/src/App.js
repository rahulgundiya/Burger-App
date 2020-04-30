import React, {Component} from 'react';
//import classes from './App.module.css';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './container/BuilderBurger/BurgerBuilder'
import Checkout from './container/Checkout/Checkout'
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
        <BurgerBuilder/> 
        <Checkout/>
       {/* { this.state.show?<BurgerBuilder/>:null } */}
      </Layout>
       </div>
   )
}
}

export default App;
