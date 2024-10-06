import { useState, useEffect, Fragment } from 'react';
import Box from '@mui/material/Box';
import { Stepper, Step, StepLabel, Button, Typography } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import DeliveryAddressForm from './DeliveryAddressForm';
import OrderSummary from './OrderSummary';
import { setCheckout, setDeliveryAddress } from '../../../State/Checkout/Action';
import { useDispatch, useSelector } from 'react-redux';
import PaymentModes from './PaymentModes';
import { getUser } from '../../../State/Auth/Action';

const steps = ['Address', 'Summary', 'Payment'];

export default function Checkout() {
    const param = useParams();
    const [activeStep, setActiveStep] = useState(0);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state.auth.user);
    const cartState = useSelector((state) => state.cart)
    const stateCheckout = useSelector((state) => state.checkout)
    useEffect(() => {
        if (userDetails && cartState) {
            dispatch(setCheckout(userDetails, cartState));
            const addressId = localStorage.getItem("addressId");
            const addresses = userDetails.address;
            if (addresses && addressId) {
                const deliveryAddress = addresses ? addresses.filter((address) => address.id == addressId) : [];
                dispatch(setDeliveryAddress(deliveryAddress[0]));
            }

        }
    }, [cartState.cart,userDetails,activeStep,setActiveStep])
    const step = parseInt(searchParams.get('step')) || 0;

    useEffect(() => {
        setActiveStep(step);
    }, [step])

    const handleBack = () => {
        const newStep = activeStep - 1;
        setActiveStep(newStep);
        navigate({ search: `?step=${newStep}` }); // Update URL with new step
    };

    return (
        <div className='xs:text-xs px-2 lg:px-20 my-6'>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={step}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                                className='overflow-hidden'
                            >
                                Back
                            </Button>
                        </Box>

                        <div>
                            {step === 0 && <DeliveryAddressForm step={activeStep} setStep={setActiveStep} data={stateCheckout.addresses} />}
                            {stateCheckout && step === 1 && <OrderSummary step={activeStep} setStep={setActiveStep} data={stateCheckout} />}
                            {step === 2 && <PaymentModes />}
                        </div>
                    </Fragment>
                )}
            </Box>
        </div>

    );
}
