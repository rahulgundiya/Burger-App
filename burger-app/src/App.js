import React, {Component} from 'react';
//import classes from './App.module.css';
import Layout from './components/Layout/Layout'
import BurgerBuilder from './container/BuilderBurger/BurgerBuilder'
class  App extends Component {
  render() {
  

   return (
    <div >
      <Layout>  
        <BurgerBuilder/>     
      </Layout>
       </div>
   )
}
}

export default App;
