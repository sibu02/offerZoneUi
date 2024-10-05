import React from 'react'
import { Grid, Typography } from '@mui/material';
const OrderSummaryItemCard = ({item}) => {
  return (
    <div className="flex space-between p-4 mb-2 bg-white shadow-lg rounded-lg">
      <Grid container spacing={2} alignItems="center">
        {/* Image and Product Details */}
        <Grid item xs={12}>
          <div className="flex items-center">
            <img
              className="w-[4rem] h-[5rem] sm:w-[5rem] sm:h-[5rem] object-cover rounded-md border object-top" 
              src={item.product.imageUrl}
              alt={item.product.title}
            />
            <div>
            <div className="ml-4 space-y-1">
            <Typography className="text-sm sm:text-base font-semibold text-gray-900">{item.product.title}</Typography>
              </div>
              <div className="ml-4 space-y-0">
              <Typography className="text-xs opacity-70 font-medium">size: {item.size}</Typography>
              <Typography className="text-xs opacity-70 font-medium">quantity: {item.quantity}</Typography>
              </div>
              </div>
          </div>
        </Grid>
        </Grid>
        {/* Total Price */}
        <div className='ml-auto my-auto'>
          <Typography className="text-sm font-medium text-gray-900">price ₹{item.discountedPrice}</Typography>
          {/* <Typography className="text-lg font-bold text-green-600">{item.discountedPrice}</Typography> */}
        </div>
    </div>
  )
}

export default OrderSummaryItemCard