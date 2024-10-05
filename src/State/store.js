import { applyMiddleware, combineReducers,legacy_createStore } from "redux";
import {thunk} from "redux-thunk";
import { authReducer } from "./Auth/Reducer";
import { customerProductReducer } from "./Product/Reducer";
import { cartReducer } from "./Cart/Reducer";
import { orderReducer } from "./Order/Reducer";
import { checkoutReducer } from "./Checkout/Reducer";
import { reviewReducer } from "./Review/Reducer";
import { notificationReducer } from "./Notification/Reducer";

// Combine all reducers
const rootReducers = combineReducers({
    auth: authReducer,
    product:customerProductReducer,
    cart:cartReducer,
    order:orderReducer,
    checkout:checkoutReducer,
    review:reviewReducer,
    notifications:notificationReducer
    
});

// Create the Redux store with middleware
export const store = legacy_createStore(
    rootReducers,
    applyMiddleware(thunk)
);
