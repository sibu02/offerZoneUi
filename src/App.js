import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Footer from './customer/component/Footer/Footer';
import Navigation from './customer/component/Navigation/Navigation';
import HomePage from './customer/component/pages/HomePage/HomePage';
import Product from './customer/component/Product/Product';
import ProductDetails from './customer/component/ProductDetails/ProductDetails';
import CartPage from './customer/component/pages/CartPage';
import Order from './customer/component/Order/Order';
import OrderDetails from './customer/component/Order/OrderDetails';
import Checkout from './customer/component/Checkout/Checkout';
import { useEffect, useState } from 'react';
import AuthModal from './customer/Auth/AuthModal';
import { ProtectedRoute } from './ProtectedRoute';
import Profile from './customer/component/Profile/Profile';
import ReviewPage from './customer/component/Order/ReviewPage';
import Notifications from './customer/component/Utility/Notifications';
import AdminPage from './Admin/Component/AdminPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [redirectPath, setRedirectPath] = useState("/");
  const jwt = localStorage.getItem("jwt");
  useEffect(() => {
    if(jwt){
      setIsAuthenticated(true);
      handleClose();
    }
  }, [isAuthenticated,jwt]);
  const handleOpen = ()=>{
    setOpenAuthModal(true);
  }
  const handleClose = ()=>{
    setOpenAuthModal(false);
  }

  const handlePath = (path) =>{
    handleOpen();
    setRedirectPath(path)
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <Notifications/>
        <main className="flex-grow">
        <Routes>
            {/* Public Routes */}
            <Route path="/signin" element={<HomePage />} />
            <Route path="/signup" element={<HomePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/:levelOne/:levelTwo/:levelThree" element={<Product/>} />
            <Route path="/products" element={<Product/>} />

            {/* Protected Routes */}
            <Route  path='/admin' element={<ProtectedRoute isAuthenticated={isAuthenticated} showModal={()=>handlePath('/admin')}><AdminPage/>
            </ProtectedRoute> } />
            <Route path='/account/profile' element={<ProtectedRoute isAuthenticated={isAuthenticated} showModal={()=>handlePath("/account/profile")}><Profile/></ProtectedRoute>} />
            <Route path="/cart" element={
              <ProtectedRoute isAuthenticated={isAuthenticated} showModal={() => handlePath('/cart')}>
                <CartPage />
              </ProtectedRoute>
            } />
            <Route path="/account/order" element={
              <ProtectedRoute isAuthenticated={isAuthenticated} showModal={() => handlePath('/account/order')}>
                <Order />
              </ProtectedRoute>
            } />
            <Route path="/account/order/:orderId" element={
              <ProtectedRoute isAuthenticated={isAuthenticated} showModal={() => handlePath('/account/order/:orderId')}>
                <OrderDetails />
              </ProtectedRoute>
            } />
            <Route path="/checkout" element={
              <ProtectedRoute isAuthenticated={isAuthenticated} showModal={() => handlePath('/checkout')}>
                <Checkout />
              </ProtectedRoute>
            } />
            <Route path="/account/order/:orderId/review/:productId" element={
              <ProtectedRoute isAuthenticated={isAuthenticated} showModal={() => handlePath('/account/order/:orderId/review/:productId')}>
                <ReviewPage />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer />
        <AuthModal open={openAuthModal} handleClose={handleClose} redirectPath={redirectPath}/>
      </div>
    </Router>
  );
}

export default App;
