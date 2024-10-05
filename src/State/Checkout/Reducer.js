import { SAVE_NEW_ADDRESS_FAILURE, SAVE_NEW_ADDRESS_REQUEST, SAVE_NEW_ADDRESS_SUCCESS, SET_CHECKOUT_FAILURE, SET_CHECKOUT_REQUEST, SET_CHECKOUT_SUCCESS, SET_DELIVERY_ADDRESS_FAILURE, SET_DELIVERY_ADDRESS_REQUEST, SET_DELIVERY_ADDRESS_SUCCESS } from "./ActionType"

const initialState = {
    addresses : [],
    deliveryAddress : null,
    cart : null,
    loading : false,
    error: null
}
export const checkoutReducer = (state=initialState,action) =>{
    switch(action.type){
        case SAVE_NEW_ADDRESS_REQUEST:
        case SET_CHECKOUT_REQUEST:
        case SET_DELIVERY_ADDRESS_REQUEST:
            return {...state,loading:true,error:null}
        case SAVE_NEW_ADDRESS_SUCCESS:
        case SET_DELIVERY_ADDRESS_SUCCESS:
            return {...state,deliveryAddress:action.payload,loading:false,error:null}
        case SET_CHECKOUT_SUCCESS:
            return {...state,cart:action.payload.cart?action.payload.cart:state.cart,addresses:action.payload.addresses,loading:false,error:null}
        case SAVE_NEW_ADDRESS_FAILURE:
        case SET_DELIVERY_ADDRESS_FAILURE:
        case SET_CHECKOUT_FAILURE:
            return {...state,loading:false,error:action.payload}
        default:
            return state;
    }
}