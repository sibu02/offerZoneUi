import { CREATE_REVIEW_FAILURE, CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS, DELETE_REVIEW_FAILURE, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, GET_REVIEW_FAILURE, GET_REVIEW_REQUEST, GET_REVIEW_SUCCESS } from "./ActionType"

const initialState = {
    reviews : [],
    review : null,
    loading : false,
    error : null
}

export const reviewReducer = (state=initialState,action) =>{
    switch(action.type){
        case CREATE_REVIEW_REQUEST:
            case GET_REVIEW_REQUEST:
                case DELETE_REVIEW_REQUEST:
                    return {...state,loading:true,error:null,review:null,reviews:[]}
        case CREATE_REVIEW_SUCCESS :
        case DELETE_REVIEW_SUCCESS :
            return {...state,loading:false,review:action.payload}
        case GET_REVIEW_SUCCESS:
            return {...state,loading:false,reviews:action.payload};
        case CREATE_REVIEW_FAILURE:
            case GET_REVIEW_FAILURE:
                case DELETE_REVIEW_FAILURE:
                    return {...state,error:action.payload,loading:false}
        default : return state
    }
}