import { ADD_NEW_PRODUCT_FAILURE, ADD_NEW_PRODUCT_REQUEST, ADD_NEW_PRODUCT_SUCCESS, FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS, FIND_PRODUCTS_FAILURE, FIND_PRODUCTS_REQUEST, FIND_PRODUCTS_SUCCESS, GET_DATA_FOR_HOME_FAILURE, GET_DATA_FOR_HOME_REQUEST, GET_DATA_FOR_HOME_SUCCESS } from "./ActionType"

const initialState = {
    products : [],
    product : null,
    loading : false,
    error : null
}
export const customerProductReducer = (state = initialState,action) =>{
    switch(action.type){
        case ADD_NEW_PRODUCT_REQUEST:
        case GET_DATA_FOR_HOME_REQUEST:
        case FIND_PRODUCTS_REQUEST:
            case FIND_PRODUCT_BY_ID_REQUEST:
                return {...state,loading:true,error:null};
        case FIND_PRODUCTS_SUCCESS:
            return {...state,loading:false,error:null,products:action.payload}
        case GET_DATA_FOR_HOME_SUCCESS:
            return {...state,loading:false,homeData:action.payload,error:null}
        case FIND_PRODUCT_BY_ID_SUCCESS:
            return {...state,loading:false,error:null,product:action.payload}
        case ADD_NEW_PRODUCT_SUCCESS:
            return {...state,laoding:false,error:null,newProduct:action.payload}
        case FIND_PRODUCTS_FAILURE:
            case ADD_NEW_PRODUCT_FAILURE:
            case FIND_PRODUCT_BY_ID_FAILURE:
            case GET_DATA_FOR_HOME_FAILURE:
                return {...state,error:action.payload,loading:false} 
        default:
            return state;   
    }
}
