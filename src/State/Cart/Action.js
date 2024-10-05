import { api } from "../../config/apiConfig";
import { addNotification } from "../Notification/Action";
import { ADD_ITEM_TO_CART_FAILURE, ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCCESS, GET_CART_FAILURE, GET_CART_REQUEST, GET_CART_SUCCESS, REMOVE_CART_ITEM_FAILURE, REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS, UPDATE_CART_ITEM_FAILURE, UPDATE_CART_ITEM_REQUEST, UPDATE_CART_ITEM_SUCCESS } from "./ActionType"


export const getCart = () => async(dispatch)=>{
    dispatch({type:GET_CART_REQUEST});
    try{
        const {data} = await api.get(`/api/cart/get`)
        dispatch({type:GET_CART_SUCCESS,payload:data})
    }
    catch(err){
        dispatch({type:GET_CART_FAILURE,payload:err.message})
    }
}

export const addItemToCart = (reqData) => async(dispatch)=>{
    dispatch({type:ADD_ITEM_TO_CART_REQUEST});
    try{
        const {data} = await api.post(`/api/cart/addItem`,reqData)
        dispatch({type:ADD_ITEM_TO_CART_SUCCESS,payload:data})
        dispatch(addNotification({message:"Item added To Cart!",type:"success"}))
    }
    catch(err){
        dispatch({type:ADD_ITEM_TO_CART_FAILURE,payload:err.message})
        dispatch(addNotification({message:"failed to add To Cart!",type:"error"}))
    }
}

export const removeCartItem = (cartItemId) =>async (dispatch)=>{
    dispatch({type:REMOVE_CART_ITEM_REQUEST});
    try{
        const res = await api.delete(`/api/cartItem/remove/${cartItemId}`)
        dispatch({type:REMOVE_CART_ITEM_SUCCESS,payload:cartItemId})
    }
    catch(err){
        dispatch({type:REMOVE_CART_ITEM_FAILURE,payload:err.message})
    }
}

export const updateCartItem = (reqData) =>async (dispatch)=>{
    dispatch({type:UPDATE_CART_ITEM_REQUEST});
    try{
        const {data} = await api.put(`/api/cartItem/update/${reqData.id}`,reqData)
        dispatch({type:UPDATE_CART_ITEM_SUCCESS,payload:data})
    }
    catch(err){
        dispatch({type:UPDATE_CART_ITEM_FAILURE,payload:err.message})
    }
}