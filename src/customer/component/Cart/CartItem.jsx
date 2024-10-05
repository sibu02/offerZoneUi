import React, { useEffect, useState } from 'react';
import { IconButton, Typography ,Button} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { removeCartItem, updateCartItem } from '../../../State/Cart/Action';

const CartItem = ({item}) => {
    const dispatch = useDispatch();

    useEffect(()=>{
    },[item.quantity])
    const handleIncrease = () =>{
        item.quantity += 1;
        dispatch(updateCartItem(item));
    }
    const handleDecrease = () =>{
        item.quantity -= 1;
        dispatch(updateCartItem(item));
    }

    const handleRemove = () =>{
        dispatch(removeCartItem(item.id));
    }
    return (
        <div className="flex sm:flex-row items-center justify-between bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 p-2 m-4 transition-all hover:shadow-xl">
            {/* Product Image */}
            <div className="flex-shrink-0 w-[6rem] h-[6rem] sm:w-[8rem] sm:h-[8rem] lg:w-[9rem] lg:h-[9rem] mr-2">
                <img className="w-full h-full object-cover object-top rounded-lg" src={item.product.imageUrl} alt={item.product.title} />
            </div>

            {/* Product Info */}
            <div className="flex-grow mt-1 sm:mt-0 sm:ml-4">
                <Typography className="text-base sm:text-lg font-semibold text-gray-900">{item.product.title}</Typography>
                <Typography className="text-sm text-gray-600">Size: {item.size}</Typography>
                <div className="flex space-x-4 text-lg lg:text-xl text-gray-900 mt-4">
                    <Typography className="font-semibold">₹{item.discountedPrice}</Typography>
                    {item.discountedPrice !== item.price && (
                        <>
                            <Typography className="text-gray-400 line-through">₹{item.price}</Typography>
                            <Typography className="text-green-600 font-semibold">{Math.round(((item.price-item.discountedPrice)/item.price)*100)}% off</Typography>
                        </>
                    )}
                </div>
                <div className="flex items-center mt-4 space-x-4">
                    {/* Quantity control */}
                    <div className="flex items-center">
                        <IconButton onClick={handleDecrease} disabled={item.quantity <= 1} className="bg-gray-100 p-2 rounded-full">
                            <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography variant="body1" className="mx-2 font-medium text-lg">{item.quantity}</Typography>
                        <IconButton onClick={handleIncrease} className="bg-gray-100 p-2 rounded-full">
                            <AddIcon fontSize="small" />
                        </IconButton>
                    </div>

                    {/* Remove Item Button */}
                    <Button
                        onClick={handleRemove}
                        variant="outlined"
                        color="secondary"
                        className="flex items-center justify-center"
                        startIcon={<DeleteIcon />}
                    >
                        Remove
                    </Button>
                </div>
            </div>
        </div>
    );
};
export default CartItem;
