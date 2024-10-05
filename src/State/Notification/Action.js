import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from "./ActionType";

export const addNotification = (notification) => (dispatch)=>{
    dispatch({type:ADD_NOTIFICATION,payload:notification})
}

export const removeNotification = () => (dispatch)=>{
    dispatch({type:REMOVE_NOTIFICATION})
}