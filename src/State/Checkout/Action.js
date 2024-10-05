import { useSelector } from "react-redux";
import { SAVE_NEW_ADDRESS_FAILURE, SAVE_NEW_ADDRESS_REQUEST, SAVE_NEW_ADDRESS_SUCCESS, SET_CHECKOUT_FAILURE, SET_CHECKOUT_REQUEST, SET_CHECKOUT_SUCCESS, SET_DELIVERY_ADDRESS_REQUEST, SET_DELIVERY_ADDRESS_SUCCESS } from "./ActionType"
import { api } from "../../config/apiConfig";
import { addNotification } from "../Notification/Action";

export const saveNewAddress = (address) => async(dispatch) =>{
    dispatch({type:SAVE_NEW_ADDRESS_REQUEST});
    try{
        const {data} = await api.post('/api/user/profile/newAddress',address);
        dispatch({type:SAVE_NEW_ADDRESS_SUCCESS,payload:data})
        localStorage.setItem('addressId',data.id);
        dispatch(addNotification({message:"Address Saved!",type:"success"}))
    }
    catch(err){
        dispatch(addNotification({message:err.message,type:"error"}))
        dispatch({type:SAVE_NEW_ADDRESS_FAILURE,payload:err.message})
    }
}

export const setCheckout = (userDetails,cart) => (dispatch)=>{
    dispatch({type:SET_CHECKOUT_REQUEST});
    try{
       const data = {
        addresses : userDetails.address,
        cart : cart,
       }
       dispatch({type:SET_CHECKOUT_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:SET_CHECKOUT_FAILURE,payload:err.message});
    }
}

export const setDeliveryAddress = (address) => (dispatch)=>{
    dispatch({type:SET_DELIVERY_ADDRESS_REQUEST});
    try{
       dispatch({type:SET_DELIVERY_ADDRESS_SUCCESS,payload:address})
    }catch(err){
        dispatch({type:SET_DELIVERY_ADDRESS_SUCCESS,payload:err.message});
    }
}