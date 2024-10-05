import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from "./ActionType"

const inititalState = {
    message : '',
    type:''
}

export const notificationReducer = (state=inititalState,action) =>{
    switch(action.type){
        case ADD_NOTIFICATION:
            return {...state,message:action.payload.message,type:action.payload.type}
        case REMOVE_NOTIFICATION:
            return inititalState
        default:
            return state;
    }
}
