import {GET_ERRORS, CLEAR_ERRORS} from '../actions/type';

//RETURN Errors
export const returnErrors = (msg,status,id=null) =>{
    return{
        type:GET_ERRORS,
        payload:{msg,status,id}
    };
}

//CLear Errors

export const clearErrors = ()=>{
    return{
        type: CLEAR_ERRORS
    };
};