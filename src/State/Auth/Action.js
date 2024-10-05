import axios from "axios"
import { api, API_BASE_URL } from "../../config/apiConfig"
import { GET_ALL_USER_FAILURE, GET_ALL_USER_REQUEST, GET_ALL_USER_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"
import { addNotification } from "../Notification/Action"

export const registerRequest = () => ({type : REGISTER_REQUEST})
export const registerSuccess = (user) => ({type : REGISTER_SUCCESS,payload : user})
export const registerFailure = (error) => ({type : REGISTER_FAILURE,payload:error})

export const register = (userData) => async (dispatch)=>{ 
     dispatch(registerRequest());
     try{
        const response = await axios.post(`${API_BASE_URL}/auth/signup`,userData)
        const user = response.data;
        if(user.jwt){
            localStorage.setItem("jwt",user.jwt)
        }
        dispatch(registerSuccess(user.jwt))
        dispatch(addNotification({message:"Registration Success.. Welcome to ShopIt!",type:"success"}))
     }catch(err){
        dispatch(addNotification({message:err.message,type:"error"}))
        dispatch(registerFailure(err.message))
     }
}

export const loginRequest = () => ({type : LOGIN_REQUEST})
export const loginSuccess = (user) => ({type : LOGIN_SUCCESS,payload : user})
export const loginFailure = (error) => ({type : LOGIN_FAILURE,payload:error})

export const login = (userData) => async (dispatch)=>{ 
    dispatch(loginRequest());
    try{
       const response = await axios.post(`${API_BASE_URL}/auth/signin`,userData)
       const user = response.data;
       if(user.jwt){
           localStorage.setItem("jwt",user.jwt)
       }
       dispatch(addNotification({message:"Welcome back to OfferZone!",type:"success"}))
       dispatch(loginSuccess(user.jwt))
    }catch(err){
        dispatch(addNotification({message:"Invalid Credentials!",type:"error"}))
       dispatch(loginFailure(err.message))
    }
}

export const getUserRequest = () => ({type : GET_USER_REQUEST})
export const getUserSuccess = (user) => ({type : GET_USER_SUCCESS,payload : user})
export const getUserFailure = (error) => ({type : GET_USER_FAILURE,payload:error})

export const getUser = () => async (dispatch) => { 
    dispatch(getUserRequest());
    try {
        const response = await api.get(`/api/user/profile`);
        const user = response.data;
        dispatch(getUserSuccess(user));
    } catch (err) {
        dispatch(getUserFailure(err.message));
    }
}

export const logout = () => (dispatch)=>{
    localStorage.clear();
    dispatch(addNotification({message:"Logged Out Succesfully!",type:"success"}))
    dispatch({type : LOGOUT,payload:null})
}

export const getAllUsers = () => async (dispatch)=>{
    dispatch({type:GET_ALL_USER_REQUEST});
    try{
        const {data} = await api.get(`/api/user/getAllUser`);
        dispatch({type:GET_ALL_USER_SUCCESS,payload:data});
    }
    catch(err){
        dispatch({type:GET_ALL_USER_FAILURE});
    }
}