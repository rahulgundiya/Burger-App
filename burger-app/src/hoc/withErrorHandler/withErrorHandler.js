import React, { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal';
import ReactAux from '../../hoc/ReactAux/ReactAux';
const withErrorHandler=(WrappedComponent , axios)=> {
   return  class extends  Component{
    state={
        error: null
    }
    componentWillMount()
        {
           this.reqInterceptor= axios.interceptors.request.use(req=>{
                this.setState({error:null})
                return req
            })
          this.resInterceptor=  axios.interceptors.response.use(res=>res ,error=>{
                this.setState({error:error})
            })
        }
        componentWillUnmount()
        {
            console.log('UnMount' , this.reqInterceptor , this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
        errorConfirmedError=()=>{
            this.setState({error:null})
        }
        render()
        {
            return(
                <ReactAux>
                    <Modal show ={this.state.error} modalClosed={this.errorConfirmedError}>
                    {this.state.error ? this.state.error.message :null}
                  </Modal>
                <WrappedComponent {...this.props } />
                </ReactAux>
    )
}
   } 
}

export default withErrorHandler;
