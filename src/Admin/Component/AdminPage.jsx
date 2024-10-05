import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { ShoppingCart, People } from '@mui/icons-material';
import Orders from './Orders';
import Users from './Users';
import CreateProduct from './CreateProduct';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Tabs for Orders and Users */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="admin tabs"
          centered
        >
          <Tab icon={<ShoppingCart />} label="Orders" />
          <Tab icon={<People />} label="Users" />
          <Tab icon={<ShoppingCart />} label="Add Product"/>
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box className="mt-4">
        {activeTab === 0 && (
          <div>
            {/* Orders List */}
            <h2 className="text-2xl font-semibold mb-4">All Orders</h2>
            <Orders activeTab={activeTab}/>
          </div>
        )}
        {activeTab === 1 && (
          <div>
            {/* Users List */}
            <h2 className="text-2xl font-semibold mb-4">All Users</h2>
            <Users />
          </div>
        )}
        {activeTab === 2 && (
          <div>
            {/* Users List */}
            <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
            <CreateProduct />
          </div>
        )}
      </Box>
    </div>
  );
};

export default AdminPage;
