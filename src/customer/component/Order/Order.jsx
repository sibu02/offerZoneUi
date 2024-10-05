import React, { useEffect, useState } from 'react';
import { Grid, IconButton, Typography, Checkbox, Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import OrderItem from './OrderItem'; // Assuming you have the OrderItem component
import { useDispatch, useSelector } from 'react-redux';
import { getOrderHistory } from '../../../State/Order/Action';
import { useLocation, useNavigate } from 'react-router-dom';

const Order = () => {
  const [filterVisible, setFilterVisible] = useState(false); // For showing/hiding filter
  const [selectedStatuses, setSelectedStatuses] = useState([]); // For tracking selected checkboxes
  const navigate = useNavigate();
  const location = useLocation();
  const decodedQueryParams = decodeURIComponent(location.search);
  const searchParam = new URLSearchParams(decodedQueryParams);
  const orderStatus = [
    { label: "On The Way", value: "on_the_way" },
    { label: "Delivered", value: "delivered" },
    { label: "Canceled", value: "canceled" },
  ];

  const dispatch = useDispatch();
  const orderState = useSelector((state)=>state.order);

  const status = searchParam.get("status");
  useEffect(()=>{
    const statuses = status?status.split(","):[];
    dispatch(getOrderHistory(statuses));
  },[status])

  // Toggle filter visibility
  const toggleFilter = () => setFilterVisible(!filterVisible);

  // Handle checkbox change
  const handleStatusChange = (statusValue) => {
    setSelectedStatuses((prevSelected) =>
      prevSelected.includes(statusValue)
        ? prevSelected.filter((value) => value !== statusValue) // Uncheck
        : [...prevSelected, statusValue] // Check
    );

  let statusArray = searchParam.get("status") ? searchParam.get("status").split(",") : [];
  if (statusArray.includes(statusValue)) {
    statusArray = statusArray.filter((status) => status !== statusValue);
  } else {
    statusArray.push(statusValue);
  }

  if (statusArray.length > 0) {
    searchParam.set("status", statusArray.join(","));
  } else {
    searchParam.delete("status");
  }
  navigate({ search: searchParam.toString() });
};

  return (
    <div className="m-3 px:lg:px-20">
      <Grid container sx={{ justifyContent: "space-between" }}>

        {/* Filter Section */}
        <Grid item xs={12} sm={3} className="relative">

          {/* Filter Icon */}
          {!filterVisible && (
            <div className="flex justify-end mb-4 sm:hidden">
              <IconButton onClick={toggleFilter}>
                <FilterListIcon />
              </IconButton>
            </div>
          )}

          {/* Filter Options (Visible on toggle) */}
          {(filterVisible || window.innerWidth >= 700) && (
            <div className="h-auto shadow-lg bg-white p-5 sticky top-5">
              <div className="flex justify-between items-center">
                <Typography variant="h6" className="font-bold">Filter</Typography>
                {filterVisible && (
                  <IconButton onClick={toggleFilter} className="sm:hidden">
                    <CloseIcon />
                  </IconButton>
                )}
              </div>

              <div className="space-y-4 mt-5">
                <Typography className="font-semibold">Order Status</Typography>
                {orderStatus.map((option) => (
                  <div key={option.value} className="flex items-center">
                    <Checkbox
                      checked={selectedStatuses.includes(option.value)}
                      onChange={() => handleStatusChange(option.value)}
                      className="h-4 w-4 border-gray-300 text-indigo-600"
                    />
                    <label className="ml-3 text-sm text-gray-600" htmlFor={option.value}>
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Grid>

        {/* Order Items Section */}
        <Grid item xs={12} sm={8.5}>

          <div className="space-y-4">
            {orderState.allOrders?.map((item)=>{
              return (
              <div key={item.id} onClick={()=>navigate(`/account/order/${item.id}`)}>
              <OrderItem order={item}  />
              </div>
              )
            })}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Order;
