import { CHANGE_ORDER_STATUS_FAILURE, CHANGE_ORDER_STATUS_REQUEST, CHANGE_ORDER_STATUS_SUCCESS, CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ALL_ORDERS_FAILURE, GET_ALL_ORDERS_REQUEST, GET_ALL_ORDERS_SUCCESS, GET_ORDER_FAILURE, GET_ORDER_HISTORY_FAILURE, GET_ORDER_HISTORY_REQUEST, GET_ORDER_HISTORY_SUCCESS, GET_ORDER_REQUEST, GET_ORDER_SUCCESS } from "./ActionType"

const initialState = {
    allOrders: [],
    order: null,
    orderItems: [],
    loading: false,
    error: null,
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_ORDERS_REQUEST:
        case GET_ORDER_REQUEST:
        case CREATE_ORDER_REQUEST:
        case GET_ORDER_HISTORY_REQUEST:
        case CHANGE_ORDER_STATUS_REQUEST:
            return { ...state, loading: true };
        case GET_ORDER_SUCCESS:
        case CREATE_ORDER_SUCCESS:
            return { ...state, order: action.payload, orderItems: action.payload.orderItems, loading: false, error: null }
        case GET_ALL_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.payload,loading: false, error: null
            }
        case GET_ORDER_HISTORY_SUCCESS:
            return { ...state, allOrders: action.payload, loading: false, error: null }
        case GET_ORDER_FAILURE:
        case CREATE_ORDER_FAILURE:
        case GET_ORDER_HISTORY_FAILURE:
        case GET_ALL_ORDERS_FAILURE:
        case CHANGE_ORDER_STATUS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case CHANGE_ORDER_STATUS_SUCCESS:
            return { ...state, loading: false, orderstatus: action.payload, error: null }
        default:
            return state;
    }
}