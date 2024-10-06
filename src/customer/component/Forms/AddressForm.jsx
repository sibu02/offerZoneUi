import { TextField,Grid,Button } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { saveNewAddress } from '../../../State/Checkout/Action';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../../State/Auth/Action';

const AddressForm = ({step,setStep}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleNewAddress = (event)=>{
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const addressData = {
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            streetAddress: data.get("address"),
            city: data.get("city"),
            state: data.get("state"),
            zipcode: data.get("zipcode"),
            mobile: data.get("mobile")
        }
        dispatch(saveNewAddress(addressData));
        setTimeout(()=>{
            const newStep = step + 1;
          setStep((prev)=>prev+1);
          navigate({ search: `?step=${newStep}` });
          },500)
          dispatch(getUser());
    }
  return (
    <div>
        
        <form onSubmit={handleNewAddress}>
            <div className='mx-2 my-4 shadow-lg p-2'>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField required
                        id='firstName'
                        name='firstName'
                        label='First Name'
                        fullWidth/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField required
                        id='lastName'
                        name='lastName'
                        label='Last Name'
                        fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField required
                        id='address'
                        name='address'
                        label='Address'
                        multiline
                        rows={4}
                        fullWidth/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField required
                        id='city'
                        name='city'
                        label='City'
                        fullWidth/>
                    </Grid>
                    <Grid item  xs={6}>
                        <TextField required
                        id='state'
                        name='state'
                        label='State'
                        fullWidth/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField required
                        id='zipcode'
                        name='zipcode'
                        label='Zipcode'
                        type='number'
                        fullWidth/>
                    </Grid>
                    <Grid item  xs={6}>
                        <TextField required
                        id='mobile'
                        name='mobile'
                        label='Mobile Number'
                        type='number'
                        
                        fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                        className='w-full'
                        type='submit'
                        variant='contained'
                        size='large'
                        > 
                            Deliver here
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </form>
    </div>
  )
}

export default AddressForm