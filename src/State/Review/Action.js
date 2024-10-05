import { api, unauthorizeApi } from "../../config/apiConfig"
import { addNotification } from "../Notification/Action";
import { CREATE_REVIEW_FAILURE, CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS, DELETE_REVIEW_FAILURE, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, GET_REVIEW_FAILURE, GET_REVIEW_REQUEST, GET_REVIEW_SUCCESS } from "./ActionType"

export const createReview = (reviewReq) => async (dispatch)=>{
    dispatch({type:CREATE_REVIEW_REQUEST})
    try{
        const data = await api.post(`/api/review`,reviewReq);
        dispatch({type:CREATE_REVIEW_SUCCESS,payload:data});
        dispatch(addNotification({message:"Review Added!",type:"success"}))
    }
    catch(err){
        dispatch(addNotification({message:err.message,type:"error"}))
        dispatch({type:CREATE_REVIEW_FAILURE,payload:err.message})
    }
}

export const getReview = (productId) => async (dispatch)=>{
    dispatch({type:GET_REVIEW_REQUEST})
    try{
        const {data} = await unauthorizeApi.get(`/api/review/${productId}`);
        dispatch({type:GET_REVIEW_SUCCESS,payload:data});
    }
    catch(err){
        dispatch({type:GET_REVIEW_FAILURE,payload:err.message})
    }
}

export const deleteReview = (productId) => async (dispatch)=>{
    dispatch({type:DELETE_REVIEW_REQUEST})
    try{
        const data = await api.delete(`/api/review/${productId}`);
        dispatch({type:DELETE_REVIEW_SUCCESS,payload:data});
    }
    catch(err){
        dispatch({type:DELETE_REVIEW_FAILURE,payload:err.message})
    }
}