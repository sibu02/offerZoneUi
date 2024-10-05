import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import SignupForm from './SignUpForm';
import LoginForm from './LoginForm';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  outline : 'none',
  boxShadow: 24,
  p: 4
};

const AuthModal = ({handleClose,open,onLoginSuccess,redirectPath}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const authState = useSelector((state)=>state.auth);
    React.useEffect(()=>{
      if(authState.jwt){
        handleClose();
        localStorage.setItem("jwt",authState.jwt)
        if(redirectPath){
          navigate(redirectPath);
        }
      }
    },[authState.jwt,onLoginSuccess,navigate,redirectPath])
    
  return (
    <div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            { location.pathname === '/signup' ?<SignupForm/>:<LoginForm/>}
        </Box>
      </Modal>
    </div>
  )
}

export default AuthModal