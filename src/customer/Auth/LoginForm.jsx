import React, { useEffect, useState } from 'react';
import { TextField, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, login } from '../../State/Auth/Action';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  useEffect(()=>{
    if(jwt){
      dispatch(getUser(jwt));
    }
  },[])
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email : email,
      password : password
    }
    dispatch(login(userData))
  };

  return (
    <Container maxWidth="sm" className="bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            className="mb-2"
          />
        </div>
        <div className="mb-4">
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            className="mb-2"
          />
        </div>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>

      <div className='py-2'>
        <span>Don't have an account? </span>
        <Button onClick={()=>navigate('/signup')}>Sign up</Button>
      </div>
    </Container>
  );
};

export default LoginForm;
