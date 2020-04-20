import React , {Component} from 'react'
import ReactAux from '../../hoc/ReactAux';
import Burger from '../../components/Burger/Burger'
class BurgerBuilder extends Component {

    render()
    {
        return (
            <ReactAux>
                <Burger />
                <div>Burger-Controls</div>

            </ReactAux>
        )
    }
}
export default BurgerBuilder;