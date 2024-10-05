import React, { useEffect, useState } from 'react';
import { TextField, Button, Container,Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getUser, register } from '../../State/Auth/Action';
import { useDispatch, useSelector } from 'react-redux';



const SignupForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const authState = useSelector((state) => state.auth)
  useEffect(()=>{
    if(jwt){
      dispatch(getUser(jwt));
    }
  },[jwt,authState.jwt])
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      firstName : firstName,
      lastName : lastName,
      email : email,
      password : password,
      number : number
    }
    dispatch(register(userData));
  };

  return (
    <Container maxWidth="sm" className="bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
          <TextField
            label="First Name"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            variant="outlined"
            className="mb-2"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Last Name"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            variant="outlined"
            className="mb-2"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            className="mb-2"
          />
        </Grid>
        <Grid item xs={12}> 
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            className="mb-2"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type='number'
            label="Phone Number"
            fullWidth
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            variant="outlined"
            className="mb-2"
          />
        </Grid>
        <Grid item xs={12}>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign Up
        </Button>
        </Grid>
        </Grid>
      </form>  

      <div className='py-3 flex justify-center item-center'>
        <span>Already have an account ?</span>
        <Button size='small' onClick={()=>navigate("/signin")}>Login</Button>
      </div>
    </Container>
  );
};

export default SignupForm;
