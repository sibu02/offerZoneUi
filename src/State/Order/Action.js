import { useNavigate } from "react-router-dom";
import { api } from "../../config/apiConfig"
import { CHANGE_ORDER_STATUS_FAILURE, CHANGE_ORDER_STATUS_REQUEST, CHANGE_ORDER_STATUS_SUCCESS, CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ALL_ORDERS_FAILURE, GET_ALL_ORDERS_REQUEST, GET_ALL_ORDERS_SUCCESS, GET_ORDER_FAILURE, GET_ORDER_HISTORY_FAILURE, GET_ORDER_HISTORY_REQUEST, GET_ORDER_HISTORY_SUCCESS, GET_ORDER_REQUEST, GET_ORDER_SUCCESS } from "./ActionType"
import { addNotification } from "../Notification/Action";

export const createOrder = (address,navigate) => async (dispatch)=>{
    dispatch({type:CREATE_ORDER_REQUEST})
    try{
        const {data} =await api.post(`/api/orders/new`,address);
        navigate(`/account/order/${data.id}`);
        dispatch({type:CREATE_ORDER_SUCCESS,payload:data})
        dispatch(addNotification({message:"Order Successfully Placed!",type:"success"}))
        
    }
    catch(err){
        dispatch(addNotification({message:err.message,type:"error"}))
        dispatch({type:CREATE_ORDER_FAILURE,payload:err.message})
    }
}

export const getOrderById = (orderId) => async (dispatch)=>{
    dispatch({type:GET_ORDER_REQUEST})
    try{
        const {data} = await api.get(`/api/orders/${orderId}`);
        dispatch({type:GET_ORDER_SUCCESS,payload:data})
    }
    catch(err){
        dispatch({type:GET_ORDER_FAILURE,payload:err.message})
    }
}

export const getOrderHistory = (statuses) => async (dispatch)=>{

    dispatch({type:GET_ORDER_HISTORY_REQUEST})
    try{
        const {data} = await api.get(`/api/orders/allOrders?status=${statuses}`);
        dispatch({type:GET_ORDER_HISTORY_SUCCESS,payload:data})
    }
    catch(err){
        dispatch({type:GET_ORDER_HISTORY_FAILURE,payload:err.message})
    }
}

export const getAllOrder = (pageNo,pageSize) => async (dispatch)=>{
    dispatch({type:GET_ALL_ORDERS_REQUEST})
    try{
        const {data} = await api.get(`/api/admin/orders?pageNo=${pageNo}&pageSize=${pageSize}`);
        dispatch({type:GET_ALL_ORDERS_SUCCESS,payload:data})
    }
    catch(err){
        dispatch({type:GET_ALL_ORDERS_FAILURE,payload:err.message})
    }
}

export const changeOrderStatus = (status,orderId) => async (dispatch)=>{
    const orderStatus = status == 'DELIVERED'?'deliver':'CONFIRMED'?'confirm':'CANCEL'?'cancel':'ship'
    dispatch({type:CHANGE_ORDER_STATUS_REQUEST})
    try{
        const {order} = await api.put(`/api/admin/orders/${orderId}/${orderStatus}`);
        
        dispatch({type:CHANGE_ORDER_STATUS_SUCCESS,payload:order})
        dispatch(addNotification({message:`Order Status Changed to ${status}`,type:"success"}))
    }
    catch(err){
        dispatch({type:CHANGE_ORDER_STATUS_FAILURE,payload:err.message})
        dispatch(addNotification({message:`Failed To Change Status`,type:"error"}))
    }
}