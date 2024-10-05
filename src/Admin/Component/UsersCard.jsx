import React from 'react';
import { Grid, Avatar, Typography, Card, CardContent } from '@mui/material';

const UsersCard = ({userData}) => {
  return (
    <Card className="p-4 mb-2 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          {/* Avatar */}
          <Grid item xs={3} sm={2}>
            <Avatar
              alt='name'
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'
              className="w-[4rem] h-[4rem] sm:w-[5rem] sm:h-[5rem] object-cover"
            />
          </Grid>

          {/* User Details */}
          <Grid item xs={9} sm={10}>
            <Typography variant="h6" className="font-semibold text-gray-900">{userData.firstName+" "+userData.lastName}</Typography>
            <Typography variant="body2" className="text-gray-600">Email: {userData.email}</Typography>
            <Typography variant="body2" className="text-gray-600">Joined on: {userData.createdAt.substring(0,10)}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default UsersCard;
