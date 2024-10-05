import React from 'react';
import { Stepper, Step, StepLabel, Button, Card, CardContent, Grid } from '@mui/material';

const OrderTracker = ({ currentStep }) => {
  // Define the steps in the order process
  const steps = ['Order Confirmed', 'Shipped', 'Out for Delivery', 'Delivered'];

  return (
    <Card className="m-4 shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-lg bg-gradient-to-r from-white to-gray-100">
      <CardContent className="p-6">
        {/* Stepper */}
        <Grid container>
            <Grid item xs={12} sm={12}>
        <Stepper activeStep={currentStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        </Grid>
        {/* <Grid item xs={2} sm={1}>
        <div className="flex justify-end">
        <Button variant="contained" color="error" className="ml-auto">
          Cancel
        </Button>
      </div>
      </Grid> */}
      </Grid>
      </CardContent>
    </Card>
  );
};

export default OrderTracker;
