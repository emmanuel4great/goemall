import React from "react";
import { createStructuredSelector } from "reselect";
import "./styles.scss";
import { useSelector } from "react-redux";
import Item from "./Item";
import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/Cart/cart.selectors";
import { useHistory } from "react-router-dom";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Button,
  Typography,
} from "@material-ui/core";

const mapState = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

function Checkout() {
  const history = useHistory();
  const { cartItems, total } = useSelector(mapState);
  const message = "You have no items in your cart";
  return (
    <div className="checkout">
      <Typography variant="h5" align="center">
        Checkout
      </Typography>
      <div className="cart">
        {cartItems.length > 0 ? (
          <div>
            <Table className="table" size="small" padding="none">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Preview</TableCell>
                  <TableCell align="left">Name&nbsp;(g)</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="left">Price&nbsp;($)</TableCell>
                  <TableCell align="center">Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item, pos) => {
                  return <Item {...item} key={pos} />;
                })}
              </TableBody>
            </Table>
          </div>
        ) : (
          <Typography variant="body1" align="center">
            {message}
          </Typography>
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="actionsWrap">
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => history.goBack()}
          >
            Continue Shopping
          </Button>
          <div className="totalWrap">
            <Typography variant="h5">Total: ${total}</Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push("/payment")}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
