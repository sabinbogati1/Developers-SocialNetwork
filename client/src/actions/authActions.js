import axios from "axios";

import setAuthToken from '../utils/setAuthToken';
import {GET_ERRORS, SET_CURRENT_USER} from './types';

//Register User
//Normal way
// export  const registeruser = (userData) =>{
//     return {
//         type: TEST_DISPATCH,
//         payload: userData
//
//     }
// }

//err.response.data

//Register User
//Using Thunk
export  const registeruser = (userData, history) =>dispatch =>{
    console.log("Action --- registeruser --- ", userData);
    axios.post('/api/users/register', userData)
        .then( res => history.push('/login'))
        .catch(err => dispatch({
                    type:GET_ERRORS,
                    payload:err.response.data
            })
        );

}


//Login - Get User Token
export const loginUser = userData => dispatch =>{
    axios.post('/api/users/login', userData )
        .then(res =>{

            //Save to localStorage
            const {token} = res.data;

            //Set token to ls
            localStorage.setItem('jwtToken', token);

            //Set token to Auth header
            setAuthToken(token);

            //Decode token to get user data
            const decoded = jwt_decode(token);

            //Set Current User
            dispatch(setCurrentUser(decoded));

        }).catch(err => dispatch({
        type: GET_ERRORS,
        payload : err.response.data
    }))
}


//Set logged in user
export const setCurrentUser = (decoded) =>{
    return{
        type: SET_CURRENT_USER,
        payload: decoded
    }
}




