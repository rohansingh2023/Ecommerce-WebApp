import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router";
import { userRequest } from "../requestMethod";

const Success = () => {
  const location = useLocation();
  const history = useHistory();
  const orderID = location.state.paypalData.orderID;
  const cart = location.state.products;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);

  console.log(currentUser);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders/", {
          userId: currentUser.user._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,
          // address: data.billing_details.address,
        });
        console.log(res.data);
        setOrderId(res.data._id);
      } catch (error) {
        console.log(error.message);
      }
    };

    orderID && createOrder();
  }, [cart, orderID, currentUser.user._id]);

  console.log(orderId);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <button
        style={{ padding: 10, marginTop: 20 }}
        onClick={() => history.push("/")}
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default Success;
