import React, { useState, useEffect } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CartDetails = ({cart}) => {
  const navigate = useNavigate();
  const handleCheckout = () =>{
    navigate("/checkout?step=0");
  }
  return (
    <Container className="p-4 bg-white shadow-lg rounded-lg m-4">
      <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-inner">
        <Typography variant="h6" className="font-semibold text-gray-700 mb-3">
          Summary
        </Typography>
        <div className="flex justify-between items-center mb-2">
          <Typography variant="body1" className="text-gray-600">Total Items:</Typography>
          <Typography variant="body1" className="font-medium text-gray-800">{cart.totalItems}</Typography>
        </div>
        <div className="flex justify-between items-center mb-2">
          <Typography variant="body1" className="text-gray-600">Total Price:</Typography>
          <Typography variant="body1" className="font-medium text-gray-800">₹{cart.totalPrice}</Typography>
        </div>
        <div className="flex justify-between items-center mb-2">
          <Typography variant="body1" className="text-gray-600">Total Discounted Price:</Typography>
          <Typography variant="body1" className="font-medium text-gray-800">₹{cart.totalDiscountedPrice}</Typography>
        </div>
      </div>

      <Button
       onClick={handleCheckout}
        variant="contained"
        color="primary"
        fullWidth
        className="mt-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:shadow-xl"
        disabled={2 === 0}
      >
        Proceed to Checkout
      </Button>
    </Container>
  );
};

export default CartDetails;
