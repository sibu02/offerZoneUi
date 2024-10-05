import React, { useEffect, useState } from 'react';
import { Grid, Button, Typography, Paper } from '@mui/material';
import AddressCard from '../Cards/AddressCard'
import AddressForm from '../Forms/AddressForm'
import { useNavigate } from 'react-router-dom'
import {setDeliveryAddress } from '../../../State/Checkout/Action'
import { useDispatch } from 'react-redux';

const DeliveryAddressForm = ({ data, setStep , step }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [addingNewAddress, setAddingNewAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  useEffect(()=>{
    setSelectedAddress(data[0])
  },[])
 
  const handleSelectedAddress = (address) => {
    setSelectedAddress(address);
    localStorage.setItem('addressId',address.id);
    dispatch(setDeliveryAddress(address));
    setTimeout(()=>{
      const newStep = step + 1;
    setStep((prev)=>prev+1);
    navigate({ search: `?step=${newStep}` });
    },500)
  };

  const handleCloseNewAddressForm = () => {
    setAddingNewAddress(false);
  };

  return (
    <div className='my-5'>
      <Grid container spacing={3}>

        {/* Add Address Button for Mobile */}
        <Grid item xs={12}>
          <div className='block md:hidden'>
              {addingNewAddress ? (
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  onClick={handleCloseNewAddressForm}
                >
                  Cancel
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => setAddingNewAddress(true)}
                  disabled={addingNewAddress} // Disable button when the form is open
                >
                  Add New Address
                </Button>
              )}

              {addingNewAddress && <AddressForm step={step} setStep={setStep} />}
          </div>
        </Grid>

        {/* Address Selection */}
        <Grid item xs={12} md={5} className='overflow-y-auto h-[30rem] p-2'>
          <Typography variant="h6" className='text-center mb-3'>
            Select Delivery Address
          </Typography>
          {data && data.length > 0 ? (
            data.map((address) => (
              <div
                key={address.id}
                className={`mb-3 rounded-lg cursor-pointer ${selectedAddress === address ? 'bg-blue-100 border border-blue-500' : 'bg-white border border-gray-200 hover:bg-gray-100'}`}
                onClick={() => handleSelectedAddress(address)}
              >
                <AddressCard data={address} />
              </div>
            ))
          ) : (
            <Typography variant="body1" className='text-center'>
              No addresses found. Please add a new address.
            </Typography>
          )}
        </Grid>

        {/* Address Form for Desktop */}
        <Grid item xs={12} md={7} className='hidden md:block'>
            <Typography variant="h6" className='mb-3'>
              Add New Address
            </Typography>
            <AddressForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default DeliveryAddressForm;
