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
            <Table className="table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Preview</TableCell>
                  <TableCell align="left">Name&nbsp;(g)</TableCell>
                  <TableCell align="left">Quantity</TableCell>
                  <TableCell align="left">Price&nbsp;($)</TableCell>
                  <TableCell align="center">Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item, pos) => {
                  return <Item {...item} key={pos} />;
                })}
                <TableRow>
                  <TableCell />
                  <TableCell colSpan={2}>
                    <b>Total</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>${total}</b>
                  </TableCell>
                  <TableCell />
                </TableRow>

                {/* <tr>
                <table>
                  <tr align="right"></tr>
                </table>
                <td>
                  <h3>Total: ${total}</h3>
                </td>
              </tr>
              <tr>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <Button onClick={() => history.goBack()}>
                          Continue Shopping
                        </Button>
                      </td>
                      <td>
                        <Button onClick={() => history.push("/payment")}>
                          Checkout
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </tr> */}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p>{message}</p>
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="actionsWrap">
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => history.goBack()}
            size="large"
          >
            Continue Shopping
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push("/payment")}
            size="large"
          >
            Checkout
          </Button>
        </div>
      )}
    </div>
  );
}

export default Checkout;
