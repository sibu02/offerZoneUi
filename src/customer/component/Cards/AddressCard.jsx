import React from 'react';
import { Card, CardContent, Typography} from '@mui/material';
import { useDispatch } from 'react-redux';
import { setDeliveryAddress } from '../../../State/Checkout/Action';

const AddressCard = ({data}) => {
  const { firstName,lastName, streetAddress, city, state, zipCode, mobile } = data;

  return (
    <Card className="shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-lg bg-gradient-to-r from-white to-gray-100 m-2">
      <CardContent className="p-6">
        {/* Name and Title */}
        <Typography variant="h6" className="font-bold text-gray-800">
          {firstName } {lastName}
        </Typography>

        {/* Address */}
        <Typography className="mt-2 text-base text-gray-600 leading-6">
          {streetAddress}, <br />
          {city}, {state}, {zipCode}, <br />
          India
        </Typography>

        {/* Phone */}
        <Typography className="mt-4 text-sm text-gray-500">
          <span className="font-medium">phone:</span> {mobile}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AddressCard;