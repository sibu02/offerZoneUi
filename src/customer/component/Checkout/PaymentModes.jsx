import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { Payment, LocalAtm } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../../State/Order/Action';
import PageLoader from '../Utility/PageLoader';

const PaymentModes = () => {
  const [selectedPayment, setSelectedPayment] = useState('cod'); // Default is Cash on Delivery (COD)
  const deliveryAddress = useSelector((state)=>state.checkout.deliveryAddress)
  let isLoading = useSelector(state=>state.order.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlePaymentSelect = (mode) => {
    setSelectedPayment(mode);
  };

  console.log(deliveryAddress)
  const handleCOD = ()=>{
    dispatch(createOrder(deliveryAddress,navigate));
  }

  const handleCancelClick = () => {
    isLoading = true;
    navigate('/cart')
  };

  return (
    <div>
        {isLoading ? (
            <PageLoader/>
        ):(
            <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md transition-transform transform hover:scale-105 space-y-4">
      <Typography variant="h5" className="font-semibold text-gray-800 text-center mb-4">
        Select Payment Mode
      </Typography>
      
      {/* Payment Options */}
      <div className="flex flex-col space-y-4">
        <Button
          variant="contained"
          className={`flex items-center justify-between py-3 px-4 rounded-md shadow-md transition-transform duration-300 transform ${selectedPayment === 'cod' ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white' : 'bg-gray-100 text-gray-800'}`}
          onClick={handleCOD}
        >
          <LocalAtm className="mr-2" />
          <span className="flex-grow text-left">Cash on Delivery</span>
        </Button>

        <Button
          variant="contained"
          className={`flex items-center justify-between py-3 px-4 rounded-md shadow-md transition-transform duration-300 transform ${selectedPayment === 'razorpay' ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white' : 'bg-gray-100 text-gray-800'}`}
          onClick={() => handlePaymentSelect('razorpay')}
          disabled={selectedPayment === 'razorpay'} // Disable Razor Pay button
        >
          <Payment className="mr-2" />
          <span className="flex-grow text-left">Razor Pay</span>
          {selectedPayment === 'razorpay' && (
            <div className="absolute inset-0 bg-red-600 opacity-75 flex justify-center items-center rounded-md text-white font-bold text-xs">
              Server Error! Try again later.
            </div>
          )}
        </Button>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col items-center space-y-4 mt-4">
        <Button
          variant="outlined"
          color='error'
          className={`py-2 px-4 w-full`}
          onClick={handleCancelClick}
        >
          Cancel
        </Button>
      </div>
    </div>
        )}
    </div>
  );
};

export default PaymentModes;
