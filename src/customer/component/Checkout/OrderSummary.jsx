import React, { useEffect} from 'react'
import { Grid } from '@mui/material'
import AddressCard from '../Cards/AddressCard'
import OrderDetails from './OrderDetails'
import OrderSummaryItemCard from './OrderSummaryItemCard'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../../State/Auth/Action'

const OrderSummary = ({data ,setStep, step}) => {
    const dispatch = useDispatch();
    const userAddress = useSelector((state)=>state.auth.user?.address)
    useEffect(()=>{
        dispatch(getUser());
    },[])
    const id = localStorage.getItem("addressId");
    const deliveryAddress = userAddress?userAddress.filter((address)=>address.id == id):[];
  return (
    <div>
        {data.cart && (
            <Grid container spacing={3}>
            {deliveryAddress.length > 0 && (
                <Grid item xs={12}>
                <AddressCard data={deliveryAddress[0]}/>
            </Grid>
            )}
            <Grid item xs={12} sm={7}>
                {data?.cart.cartItems.map((item)=>{
                    return <OrderSummaryItemCard key={item.id} item={item}/>
                })}
            </Grid>
            <Grid item xs={12} sm={5}>
                <OrderDetails step={step} setStep={setStep} cartDetails={data.cart.cart}/>
            </Grid>
            
        </Grid>
        )}
    </div>
  )
}

export default OrderSummary