import * as actionTypes from './actionTypes'
import axios from 'axios'
export const authStart =()=>{
    return {
        type:actionTypes.AUTH_START
    }
}
export const authSuccess=(token ,userId)=>{
    return {
        type:actionTypes.AUTH_SUCCESS,
        idToken :token,
        userId:userId

    }
}
export const authFail =(error)=>{
    return {
        type:actionTypes.AUTH_FAIL,
        error:error

    }
}

export const auth=(email,password ,isSignup)=>{
    return dispatch=>{
        dispatch(authStart())
        const authData ={
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBVH61NpO3suwIon1jBwlAijsQ9iKpZNqc';
       if(!isSignup){
           url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBVH61NpO3suwIon1jBwlAijsQ9iKpZNqc'
       }
        axios.post(url,authData)
       .then(res=>{
           console.log(res)
           dispatch(authSuccess(res.data.idToken ,res.data.localId))
       })
       .catch(err=>{
           console.log('Error Catch' ,err.res)

           dispatch(authFail(err))
       })
    }
}