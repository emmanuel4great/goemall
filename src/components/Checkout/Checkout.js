import React from "react";
import { createStructuredSelector } from "reselect";
import "./styles.scss";
import { useSelector } from "react-redux";
import Button from "../forms/Button";
import Item from "./Item";
import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/Cart/cart.selectors";
import { useHistory } from "react-router-dom";

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
      <h1>Checkout</h1>
      <div className="cart">
        {cartItems.length > 0 ? (
          <table>
            <tbody>
              <tr>
                <table className="checkoutHeader">
                  <tbody>
                    <tr>
                      <th>Product</th>
                      <th>Description</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Remove</th>
                    </tr>
                  </tbody>
                </table>
              </tr>
              <tr>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        {cartItems.map((item, pos) => {
                          return (
                            <tr key={pos}>
                              <td>
                                <Item {...item} />
                              </td>
                            </tr>
                          );
                        })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </tr>
              <tr>
                <table>
                  <tr align="right">
                    <td>
                      <h3>Total: ${total}</h3>
                    </td>
                  </tr>
                </table>
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
              </tr>
            </tbody>
          </table>
        ) : (
          <p>{message}</p>
        )}
      </div>
    </div>
  );
}

export default Checkout;
