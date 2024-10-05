import React, { useEffect } from 'react'
import CartItem from './CartItem'
import { Grid, Typography } from '@mui/material'
import CartDetails from './CartDetails'
import { useDispatch, useSelector } from 'react-redux'
import { getCart } from '../../../State/Cart/Action'
import EmptyCart from '../Utility/EmptyCart'
import PageLoader from '../Utility/PageLoader'

const Cart = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart)
  const data = cartState.cartItems;
  function compare(a, b) {
    if (a.id < b.id) {
      return 1;
    }
    if (a.id > b.id) {
      return -1;
    }
    return 0;
  }
  if (data) data.sort(compare);
  const jwt = localStorage.getItem("jwt");
  useEffect(() => {
    dispatch(getCart())
  }, [cartState.updateCartItem, cartState.removeCartItem,cartState.addCartItem])
  return (
    <div>
      {cartState?.gettingCart ? (
        <PageLoader/>
      ):(
        <div>
      {jwt && cartState.cart ? data.length > 0 ? (
        <div>
        <Typography variant="h4" className="text-center font-semibold mb-6 text-gray-800">
          Your Cart
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7} className=' lg:h-[40rem] lg:overflow-y-scroll'>
            {data.map((item) => {
              return <div key={item.id}><CartItem item={item} /></div>
            })}
          </Grid>
          <Grid item xs={12} md={5}>
            <CartDetails cart={cartState.cart} />
          </Grid>
        </Grid>
      </div>
      ) : (
        <div>
          <EmptyCart/>
        </div>
      ) : (
        <div>
          <h1>Please Login to use Cart</h1>
        </div>
      ) }
    </div>
      )}
    </div>
  )
}

export default Cart