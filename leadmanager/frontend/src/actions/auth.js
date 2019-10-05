import axios from  'axios';
import {returnErrors} from './messages';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from  './types'

// CHECK TOKEN & LOAD USER 

export const loadUser = () =>  (dispatch,getState) => {
     // User Loading
      dispatch({type: USER_LOADING})
      // Get Token from state

      const token  = getState().auth.token ;
     console.log(token);
      //Headers 

      const config = {
          headers: {
              "Content-Type" : 'application/json'
          }
      }
      //if Token add to headers config
  
      if(token){
          config.headers["Authorization"] = `Token ${token}`;
      } 

 axios.get('/api/auth/user',config)
    .then(res => {
        dispatch({
            type : USER_LOADED,
            payload : res.data
        })
    })
    .catch(err => {
        console.log("CATCH")
        console.log(err.response)
        dispatch(returnErrors(err.response.data,
            err.response.status))
         dispatch({
             type : AUTH_ERROR
         })   
    })
     
}
//LOGIN USER 
export const login = (username,password) =>  (dispatch) => {
    
     //Headers 
     const config = {
         headers: {
             "Content-Type" : 'application/json'
         }
     }
     // request body
     
     const body = JSON.stringify({username, password})

     //if Token add to headers config
    console.log(body)

axios.post('/api/auth/login',body,config)
   .then(res => {
       dispatch({
           type : LOGIN_SUCCESS,
           payload : res.data
       })
    }).catch(err => {
       dispatch(returnErrors(err.response.data,
           err.response.status))
        dispatch({
            type : LOGIN_FAIL
        })   
   })
   
}