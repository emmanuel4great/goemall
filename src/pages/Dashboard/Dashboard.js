import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrderHistory } from "../../redux/Orders/orders.actions";
import OrderHistory from "../../components/OrderHistory";
import { Typography } from "@material-ui/core";

const mapState = ({ user, ordersData }) => ({
  currentUser: user.currentUser,
  orderHistory: ordersData.orderHistory.data,
});

function Dashbaord() {
  const dispatch = useDispatch();
  const { currentUser, orderHistory } = useSelector(mapState);
  useEffect(() => {
    dispatch(getUserOrderHistory(currentUser.id));
  }, []);

  return (
    <div>
      <Typography variant="h5" align="center">
        Order History
      </Typography>
      <OrderHistory orders={orderHistory} />
    </div>
  );
}

export default Dashbaord;
