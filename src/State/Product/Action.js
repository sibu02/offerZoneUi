import { api, unauthorizeApi } from "../../config/apiConfig";
import { ADD_NEW_PRODUCT_FAILURE, ADD_NEW_PRODUCT_REQUEST, ADD_NEW_PRODUCT_SUCCESS, FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS, FIND_PRODUCTS_FAILURE, FIND_PRODUCTS_REQUEST, FIND_PRODUCTS_SUCCESS, GET_DATA_FOR_HOME_FAILURE, GET_DATA_FOR_HOME_REQUEST, GET_DATA_FOR_HOME_SUCCESS } from "./ActionType";
import { addNotification } from "../Notification/Action";

export const findProducts = (reqData) => async(dispatch)=>{
    dispatch({type : FIND_PRODUCTS_REQUEST})
    const {sizes,minPrice,maxPrice,minDiscount,categoryLevelThree,categoryLevelTwo,categoryLevelOne,stock,sort,pageNo,pageSize,searchQuery} = reqData;
    try{
        const {data} =await unauthorizeApi.get(`/api/products?searchQuery=${searchQuery}&sizes=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&categoryLevelThree=${categoryLevelThree}&categoryLevelTwo=${categoryLevelTwo}&categoryLevelOne=${categoryLevelOne}&stock=${stock}&sort=${sort}&pageNo=${pageNo}&pageSize=${pageSize}`);
        dispatch({type:FIND_PRODUCTS_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:FIND_PRODUCTS_FAILURE,payload:err.message})
    }
}

export const findProductbyId = (prudctId) => async(dispatch)=>{
    dispatch({type : FIND_PRODUCT_BY_ID_REQUEST})
    try{
        const {data} =await unauthorizeApi.get(`/api/products/${prudctId}`);
        dispatch({type:FIND_PRODUCT_BY_ID_SUCCESS,payload:data})
    }catch(err){
        dispatch({type:FIND_PRODUCT_BY_ID_FAILURE,payload:err.message})
    }
}

export const getProductDataForHome = () => async(dispatch)=>{
    dispatch({type:GET_DATA_FOR_HOME_REQUEST});
    try{
        const {data} = await unauthorizeApi.get("/api/products/get/homedata")
        dispatch({type:GET_DATA_FOR_HOME_SUCCESS,payload:data});
    }
    catch(err){
        dispatch({type:GET_DATA_FOR_HOME_FAILURE,payload:err.message})
    }
}

export const addNewProduct = (req) => async(dispatch)=>{
    dispatch({type:ADD_NEW_PRODUCT_REQUEST});
    try{
        const {data} = await api.post("/api/admin/product/new",req)
        dispatch({type:ADD_NEW_PRODUCT_SUCCESS,payload:data});
        dispatch(addNotification({message:"Product Added Successfully !",type:"success"}))
    }
    catch(err){
        dispatch({type:ADD_NEW_PRODUCT_FAILURE,payload:err.message})
        dispatch(addNotification({message:"Product Failed To Add!",type:"error"}))
    }
}