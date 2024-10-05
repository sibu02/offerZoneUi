import React from 'react';
import { Grid, Typography } from '@mui/material';

const OrderItem = ({order}) => {
  return (
    <div className="p-4 mb-2 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
      <Grid container spacing={2} alignItems="center">
        {/* Image and Product Details */}
        <Grid item xs={9} sm={6}>
          <div className="flex items-center">
            <img
              className="w-[4rem] h-[4rem] sm:w-[5rem] sm:h-[5rem] object-cover object-top rounded-md border"
              src={order.orderItems[0].product.imageUrl}
              alt={order.orderItems[0].product.title}
            />
            <div className="ml-4 space-y-1">
              <Typography className="text-sm sm:text-base font-semibold text-gray-900">{order.orderItems[0].product.title}</Typography>
              <Typography className="text-xs sm:text-sm opacity-70 font-medium">Total Items: {order.totalItems}</Typography>
            </div>
          </div>
        </Grid>

        {/* Total Price */}
        <Grid item xs={3} sm={2}>
          <Typography className="text-sm sm:text-base font-medium text-gray-900">Total Price</Typography>
          <Typography className="text-lg sm:text-xl font-bold text-green-600">₹ {order.totalDiscountedPrice}</Typography>
        </Grid>

        {/* Delivery Info */}
        <Grid item xs={12} sm={4}>
          <div className="bg-green-50 p-2 rounded-lg text-center">
          <Typography className="text-xs sm:text-sm text-green-700 font-semibold">Status : {order.orderStatus}</Typography>
            <Typography className="text-xs sm:text-sm text-green-700 font-semibold">Odered on : {order.orderedDate.substring(0,10)}</Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderItem;
