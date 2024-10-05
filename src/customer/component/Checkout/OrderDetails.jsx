import React from 'react'
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const OrderDetails = ({cartDetails,step,setStep}) => {
  const navigate = useNavigate();
  const handlePayment = ()=>{
    const newStep = step + 1;
    setStep((prev)=>prev+1);
    navigate({ search: `?step=${newStep}` });
  }
  return (
    <Container className="p-4 bg-white shadow-lg rounded-lg m-2">
       <Typography variant="h4" className="text-center font-semibold mb-6 text-gray-800">
       Payment Details
      </Typography>
      <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-inner">
        <div className="flex justify-between items-center mb-2">
          <Typography variant="body1" className="text-gray-600">Total Items:</Typography>
          <Typography variant="body1" className="font-medium text-gray-800">{cartDetails.quantity}</Typography>
        </div>
        <div className="flex justify-between items-center mb-2">
          <Typography variant="body1" className="text-gray-600">Total Price:</Typography>
          <Typography variant="body1" className="font-medium text-gray-800">₹{cartDetails.totalPrice}</Typography>
        </div>
        <div className="flex justify-between items-center mb-2">
          <Typography variant="body1" className="text-gray-600">Total Discounted Price:</Typography>
          <Typography variant="body1" className="font-medium text-gray-800">₹{cartDetails.totalDiscountedPrice}</Typography>
        </div>
      </div>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        className="mt-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:shadow-xl"
        disabled={2 === 0}
        onClick={handlePayment}
      >
        Payment
      </Button>
    </Container>
  )
}

export default OrderDetails