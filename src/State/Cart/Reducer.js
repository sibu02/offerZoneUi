import { ADD_ITEM_TO_CART_FAILURE, ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCCESS, GET_CART_FAILURE, GET_CART_REQUEST, GET_CART_SUCCESS, REMOVE_CART_ITEM_FAILURE, REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS, UPDATE_CART_ITEM_FAILURE, UPDATE_CART_ITEM_REQUEST, UPDATE_CART_ITEM_SUCCESS } from "./ActionType"

const initialState = {
    cart : {},
    cartItems : [],
    error : null,
    loading : false
}
export const cartReducer = (state=initialState,action) =>{
    switch(action.type){
        case ADD_ITEM_TO_CART_REQUEST:
        case GET_CART_REQUEST:
            return {...state,gettingCart:true,error:null}
        case REMOVE_CART_ITEM_REQUEST:
        case UPDATE_CART_ITEM_REQUEST:
            return {...state,loading:true,error:null}
        case ADD_ITEM_TO_CART_SUCCESS:
            const existing = state.cartItems.findIndex(item=>item.id==action.payload.id);
            if(existing !== -1){
                const updatedCartItem = [...state.cartItems];
                updatedCartItem[existing] = action.payload;
                return {...state,loading:false,gettingCart:false,addCartItem:action.payload,cartItems:updatedCartItem};
            }
            else{
                return {...state,loading:false,gettingCart:false,addCartItem:action.payload,cartItems:[...state.cartItems,action.payload]};
            }
        case REMOVE_CART_ITEM_SUCCESS:
            return {...state,removeCartItem:action.payload,cartItems:state.cartItems.filter((item)=>item.id != action.payload.id),loading:false}
        case UPDATE_CART_ITEM_SUCCESS:
            return {...state,updateCartItem:action.payload,cartItems:state.cartItems.map((item)=>item.id === action.payload.id ? action.payload:item),loading:false}
        case GET_CART_SUCCESS:
            return {...state,gettingCart:false,cartItems:action.payload.cartItems,loading:false,cart:action.payload}
        case ADD_ITEM_TO_CART_FAILURE:
        case GET_CART_FAILURE:
        case REMOVE_CART_ITEM_FAILURE:
        case UPDATE_CART_ITEM_FAILURE:
            return {...state,error:action.payload,loading:false,gettingCart:false};
        default:
            return state
    }
}