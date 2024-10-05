import axios from "axios"
import { useDispatch } from "react-redux";
import { addNotification } from "../State/Notification/Action";
export const API_BASE_URL = `${process.env.REACT_APP_API_URL}`

const jwt = localStorage.getItem("jwt");

export const api = axios.create({
    baseURL:API_BASE_URL,
    headers:{
        "Authorization":`Bearer ${jwt}`,
        "Content-Type" : "application/json"
    }
})
api.interceptors.request.use(config => {
    const jwt = localStorage.getItem("jwt"); 
    if (jwt) {
        config.headers.Authorization = `Bearer ${jwt}`; 
    }
    return config;
});

api.interceptors.response.use(
    response=>response,
    error=>{
        if(error.response && error.response.status === 401){
            console.log(401);
            if(error.response.data === 'Token expired'){
                const dispatch = useDispatch();
                dispatch(addNotification({message:'Session Token Expired, Please Login Again!',type:"error"}))
                localStorage.clear();
            }
        }
        return Promise.reject(error);
    }
)

export const unauthorizeApi = axios.create({
    baseURL:API_BASE_URL,
})

