import axios from  'axios';
import {returnErrors} from './messages';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCES,
    REGISTER_FAIL,
    REGISTER_SUCCESS
} from  './types'

// CHECK TOKEN & LOAD USER 

export const loadUser = () =>  (dispatch,getState) => {
     // User Loading
      dispatch({type: USER_LOADING})
      // Get Token from state
 axios.get('/api/auth/user',tokenConfig(getState))
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

//LOGOUT USER 
export const logout = () =>  (dispatch,getState) => {
    // User Loading
     
   

axios.post('/api/auth/logout/',null,tokenConfig(getState))
   .then(res => {
       dispatch({
           type : LOGOUT_SUCCES
       })
   })
   .catch(err => {
       console.log("CATCH")
       console.log(err.response)
       dispatch(returnErrors(err.response.data,
           err.response.status)) 
   })
    
};
// REGISTER USER 
export const register  = ({username,password,email}) =>  (dispatch) => {
    
    //Headers 
    const config = {
        headers: {
            "Content-Type" : 'application/json'
        }
    }
    // request body
    
    const body = JSON.stringify({username, password, email})

    //if Token add to headers config
   console.log(body)

axios.post('/api/auth/register',body,config)
  .then(res => {
      dispatch({
          type : REGISTER_SUCCESS,
          payload : res.data
      })
   }).catch(err => {
      dispatch(returnErrors(err.response.data,
          err.response.status))
       dispatch({
           type : REGISTER_FAIL
       })  
  })
  
}



export const tokenConfig = getState =>{
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

      return config;
}


