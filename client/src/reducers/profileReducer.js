import {GET_PROFILE, PROFILE_LOADING, CLEAR_CURENT_PROFILE} from "../actions/types";

const initialState ={
    profile : "",
    profiles: "",
    loading : false
}


export default function(state = initialState, action){

    switch (action.types){

        case PROFILE_LOADING:
            return {
                ...state,
                loading:true
            };

        case GET_PROFILE:
            return{
                ...state,
                profile:action.payload,
                loading:false
            };

        case CLEAR_CURENT_PROFILE:
            return{
                ...state,
                profile: null
            }

        default:
            return state;
    }

}