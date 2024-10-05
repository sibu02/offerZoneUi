import React from 'react';
import { Grid, Typography, Button, Card, CardContent } from '@mui/material';
import { StarIcon } from '@heroicons/react/24/outline';

const OrderedItem = ({ order,status }) => {
  return (
    <Card className="mb-4 shadow-lg hover:shadow-2xl rounded-lg bg-white transition-shadow duration-300">
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          {/* Product Image and Details */}
          <Grid item xs={7} sm={7}>
          <Typography variant="h6" className="font-semibold text-gray-900">
                  {order.title}
                </Typography>
            <div className="flex items-center">
              <img
                className="w-[4rem] h-[4rem] sm:w-[5rem] sm:h-[5rem] object-top object-cover rounded-md border"
                src={order.product.imageUrl}
                alt={order.title}
              />
              <div className="ml-4">
                <Typography variant="body2" className="text-gray-600">
                  Size: {order.size}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  Price: ₹{order.discountedPrice}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  Quantity: {order.quantity}
                </Typography>
              </div>
            </div>
          </Grid>

          {/* Review Button */}
          {status === "DELIVERED" && (
            <Grid item xs={5} sm={5} className="flex justify-end">
            <a href={`/account/order/${order.id}/review/${order.product.id}`} className="flex items-center space-x-1 group">
                <StarIcon className="h-[1.5rem] text-gray-500 group-hover:text-yellow-500 group-hover:fill-yellow-500 transition-colors duration-100"/>
                <span className="text-gray-600 opacity-50 group-hover:opacity-100">Rate & Review</span>
            </a>
         </Grid>
          )}
          

        </Grid>
      </CardContent>
    </Card>
  );
};

export default OrderedItem;