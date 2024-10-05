import React, { useEffect, useState } from "react";
import AddressCard from "../Cards/AddressCard";
import OrderTracker from "./OrderTracker";
import OrderedItem from "./OrderedItem";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../../State/Order/Action";
import PageLoader from "../Utility/PageLoader";

const OrderDetails = () => {

  const [step, setStep] = useState(0);
  const dispatch = useDispatch();
  const param = useParams();
  const userDetails = useSelector((state) => state.auth)
  const orderState = useSelector((state) => state.order)


  useEffect(() => {
    dispatch(getOrderById(param.orderId));
    if (orderState.order) {
      const orderStatus = orderState.order.orderStatus;
      const currStep = orderStatus === 'PENDING' ? 0 : orderStatus === 'CONFIRMED' ? 1 : orderStatus === 'SHIPPED' ? 2 : orderStatus === 'OUT FOR DELIVERY' ? 3 : 4;
      setStep(currStep);
    }
  }, [userDetails, param.orderId, step])
  const isLoading = orderState.laoading;
  return (
    <div>
      {isLoading ? (
        <PageLoader />
      ) : (
        <div>
          {orderState.order && (
            <div>
              <div>
                <AddressCard data={orderState.order.shippingAddress} />
              </div>
              <div className="m-y-2">
                <OrderTracker currentStep={step} />
              </div>
              <div className="p-4">
                {orderState.orderItems.map((item, index) => (
                  <OrderedItem key={index} order={item} status={orderState.order.orderStatus} />
                ))}

              </div>
            </div>
          )}
        </div>
      )}

    </div>
  )
}

export default OrderDetails;