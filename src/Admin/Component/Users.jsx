import React, { useEffect, useState } from 'react';
import UsersCard from './UsersCard';  // Your card-based user item
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../State/Auth/Action';

const Users = () => {
    const users = useSelector((state) => state.auth.allUsers)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsers());
    }, [])
    return (
        <div className="space-y-4">
            {users?.map((user) => (
                <UsersCard key={user.id} userData={user} />
            ))}
        </div>
    );
};

export default Users;
