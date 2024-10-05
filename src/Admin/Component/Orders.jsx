import React, { useEffect, useState } from 'react';
import OrdersCard from './OrdersCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrder } from '../../State/Order/Action';
import InfiniteScroll from 'react-infinite-scroll-component';
import PageLoader from '../../customer/component/Utility/PageLoader';

const Orders = () => {
    const dispatch = useDispatch();
    const allOrders = useSelector((state) => state.order.orders);

    useEffect(() => {
        dispatch(getAllOrder(0, 50));
    }, []);
    return (
        <div className="space-y-4">
            {allOrders?.content?.map((order) => (
                    <OrdersCard key={order.id} orderItem={order} />
            ))}
        </div>
    );
};

export default Orders;
