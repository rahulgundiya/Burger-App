import React, { Component } from 'react';
import classes from './Modal.module.css'
import ReactAux from '../../../hoc/ReactAux/ReactAux'
import Backdrop from '../Backdrop/Backdrop';
class Modal extends Component {
shouldComponentUpdate(nextProps,nextState){
return nextProps.show !== this.props.show || nextProps.children!==this.props.children
}
componentDidUpdate()
{
    console.log('[Modal.js] DidUpdate');
}

    render()
    {
        return (
<ReactAux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
    <div className={classes.Modal}
    style={{transform:this.props.show ? 'translateY(0)' : 'translate(-100vh)',
    opacity:this.props.show ?'1':'0'
    }}>
        {this.props.children}
    </div>
    </ReactAux>
        )
    }
      
}
export default Modal;