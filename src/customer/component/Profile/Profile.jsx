import React from 'react';
import { Avatar, Button, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';
import PageLoader from '../Utility/PageLoader';

const Profile = () => {
    const authUser = useSelector((state)=>state.auth.user)
    return (
        <div className="mx-auto p-6 bg-white rounded-lg flex space-x-8">
            {authUser?(
                <Grid container>
                <Grid item lg={4} xs={12}>
                    {/* Avatar Section */}
                    <div className="flex-shrink-0">
                        <Avatar
                            alt={authUser.firstName}
                            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkZTK04q5MAb3xxGj9xiBt-rOefqwu5X4jtg&s'
                            sx={{ width: 120, height: 120 }}
                            className="border-4 border-blue-500"
                        />
                    </div>
                </Grid>
                <Grid item xs={12} lg={8}>
                    {/* User Info Section */}
                    <div className="flex flex-col space-y-4">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800">{authUser.firstName +" "+authUser.lastName}</h2>
                            <p className="text-gray-600">{authUser.email}</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Address</h3>
                            {authUser.address.length > 0 ? (
                                <p className="text-gray-600">{authUser.address[0].streetAddress+", "+authUser.address[0].city+", "+authUser.address[0].state+" - "+authUser.address[0].zipcode}</p>
                            ):(
                                <p className="text-gray-600">No Address Available</p>
                            )}
                            
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Phone</h3>
                            <p className="text-gray-600">{authUser.number}</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Member Since</h3>
                            <p className="text-gray-600">{authUser.createdAt.substring(0,10)}</p>
                        </div>

                        <div className="flex space-x-4">
                            <Button variant="contained" disabled color="primary" startIcon={<EditIcon />}>
                                Edit Profile
                            </Button>
                            <Button disabled variant="outlined" color="secondary">
                                Change Password
                            </Button>
                        </div>
                    </div>
                </Grid>
            </Grid>
            ):(
                <PageLoader/>
            )}
            

        </div>
    );
};

export default Profile;
