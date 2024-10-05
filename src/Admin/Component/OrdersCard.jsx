import React, { useState } from 'react';
import { Grid, Typography, Select, MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { changeOrderStatus } from '../../State/Order/Action';

const OrdersCard = ({orderItem}) => {
    const [status, setStatus] = useState(orderItem.orderStatus);
    const dispatch = useDispatch();
    const handleStatusChange = async (event) => {
        const newStatus = event.target.value;
        setStatus(newStatus);
        dispatch(changeOrderStatus(newStatus,orderItem.id));
    };
    return (
        <div className="p-4 mb-2 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
            <Grid container spacing={2} alignItems="center">
                {/* Image and Product Details */}
                <Grid item xs={8} sm={6}>
                    <div className="flex items-center">
                        <img
                            className="w-[4rem] h-[4rem] sm:w-[5rem] sm:h-[5rem] object-cover object-top rounded-md border"
                            src={orderItem.orderItems[0].product.imageUrl}
                            alt={orderItem.orderItems[0].product.title}
                        />
                        <div className="ml-4 space-y-1">
                            <Typography className="text-sm sm:text-base font-semibold text-gray-900">{orderItem.orderItems[0].product.title}</Typography>
                            <Typography className="text-xs sm:text-sm opacity-70 font-medium">Total Items: {orderItem.totalItems}</Typography>
                        </div>
                    </div>
                </Grid>

                {/* Total Price */}
                <Grid item xs={4} sm={2}>
                    <Typography className="text-sm sm:text-base font-medium text-gray-900">Total Price</Typography>
                    <Typography className="text-lg sm:text-xl font-bold text-green-600">₹ {orderItem.totalDiscountedPrice}</Typography>
                </Grid>

                {/* Delivery Info */}
                <Grid item xs={12} sm={4}>
                    <div className="bg-green-50 p-2 rounded-lg text-center">
                        <Typography className="text-xs sm:text-sm text-green-700 font-semibold">Ordered on: {orderItem.orderedDate.substring(0,10)}</Typography>
                    </div>
                </Grid>

                {/* Order Status and Dropdown */}
                <Grid item xs={12} sm={6}>
                    <div className="flex items-center justify-between">
                        <Typography className="text-sm font-semi-bold">Status: </Typography>
                        <Select
                            value={status}
                            onChange={handleStatusChange}
                            className="border rounded-md text-sm sm:text-base"
                            style={{ minWidth: '15rem',borderRadius:'10px' }}
                            sx={{
                                '.MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: 'lightgray' },
                                    '&:hover fieldset': { borderColor: 'green' },
                                    '&.Mui-focused fieldset': { borderColor: 'green' },
                                },
                            }}
                        >
                            <MenuItem value="PENDING">PENDING</MenuItem>
                            <MenuItem value="CONFIRMED">CONFIRMED</MenuItem>
                            <MenuItem value="SHIPPED">SHIPPED</MenuItem>
                            <MenuItem value="DELIVERED">DELIVERED</MenuItem>
                            <MenuItem value="CANCELED">CANCELED</MenuItem>
                        </Select>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default OrdersCard;
