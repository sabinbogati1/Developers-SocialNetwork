import {GET_ERRORS} from './types';
import axios from "axios";

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

