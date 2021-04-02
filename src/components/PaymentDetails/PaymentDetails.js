import React, { useState, useEffect } from "react";
import "./styles.scss";
import { CountryDropdown } from "react-country-region-selector";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { apiInstance } from "../../utils";
import {
  selectCartTotal,
  selectCartItemsCount,
  selectCartItems,
} from "../../redux/Cart/cart.selectors";

import { createStructuredSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { saveOrderHistory } from "../../redux/Orders/orders.actions";
import { TextField, Paper, Typography, Button } from "@material-ui/core";

const initialAddressState = {
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
};

const mapState = createStructuredSelector({
  total: selectCartTotal,
  itemCount: selectCartItemsCount,
  cartItems: selectCartItems,
});

function PaymentDetails() {
  const history = useHistory();
  const dispatch = useDispatch();
  const element = useElements();
  const stripe = useStripe();
  const { total, itemCount, cartItems } = useSelector(mapState);
  const [billingAdress, setBillingAddress] = useState({
    ...initialAddressState,
  });
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  const [recipientName, setRecipientName] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");

  const handleShipping = (evt) => {
    const { name, value } = evt.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleBilling = (evt) => {
    const { name, value } = evt.target;
    setBillingAddress((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (itemCount < 1) {
      history.push("/dashboard");
    }
  }, [itemCount]);

  const handleFormSubmit = async (evt) => {
    evt.preventDefault();
    const cardElement = element.getElement("card");

    if (
      !shippingAddress.line1 ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.postal_code ||
      !shippingAddress.country ||
      !billingAdress.line1 ||
      !billingAdress.city ||
      !billingAdress.state ||
      !billingAdress.postal_code ||
      !billingAdress.country ||
      !recipientName ||
      !nameOnCard
    ) {
      return;
    }
    apiInstance
      .post("/payments/create", {
        amount: total * 100,
        shipping: {
          name: recipientName,
          address: {
            ...shippingAddress,
          },
        },
      })
      .then(({ data: clientSecret }) => {
        stripe
          .createPaymentMethod({
            type: "card",
            card: cardElement,
            billing_details: {
              name: nameOnCard,
              address: {
                ...billingAdress,
              },
            },
          })
          .then(({ paymentMethod }) => {
            stripe
              .confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
              })
              .then(({ paymentIntent }) => {
                const configOrder = {
                  orderTotal: total,
                  orderItems: cartItems.map((item) => {
                    const {
                      documentID,
                      productThumbnail,
                      productName,
                      productPrice,
                      quantity,
                    } = item;
                    return {
                      documentID,
                      productThumbnail,
                      productName,
                      productPrice,
                      quantity,
                    };
                  }),
                };
                dispatch(saveOrderHistory(configOrder));
              });
          });
      });
  };

  const configCardElement = {
    iconStyles: "solid",
    style: {
      base: {
        fontSize: "16px",
      },
    },
    hidePostalCode: true,
  };
  return (
    <Paper className="paymentDetails">
      <form onSubmit={handleFormSubmit}>
        <div className="group">
          <Typography variant="h6" align="center">
            Shipping Address
          </Typography>
          <TextField
            fullWidth
            type="text"
            label="Recipient Name"
            value={recipientName}
            onChange={(evt) => setRecipientName(evt.target.value)}
            name="recipientName"
            required
          />
          <TextField
            fullWidth
            type="text"
            label="Line 1"
            value={shippingAddress.line1}
            name="line1"
            onChange={(evt) => handleShipping(evt)}
            required
          />
          <TextField
            fullWidth
            type="text"
            label="Line 2"
            value={shippingAddress.line2}
            name="line2"
            onChange={(evt) => handleShipping(evt)}
          />
          <TextField
            fullWidth
            type="text"
            label="City"
            value={shippingAddress.city}
            name="city"
            onChange={(evt) => handleShipping(evt)}
            required
          />
          <TextField
            fullWidth
            type="text"
            label="State"
            value={shippingAddress.state}
            name="state"
            onChange={(evt) => handleShipping(evt)}
            required
          />
          <TextField
            fullWidth
            type="text"
            label="Postal Code"
            value={shippingAddress.postal_code}
            name="postal_code"
            onChange={(evt) => handleShipping(evt)}
            required
          />
          <div className="formRow checkoutInput">
            <CountryDropdown
              valueType="short"
              onChange={(val) =>
                handleShipping({
                  target: {
                    name: "country",
                    value: val,
                  },
                })
              }
              value={shippingAddress.country}
              required
            />
          </div>
        </div>
        <div className="group">
          <Typography variant="h6" align="center">
            Billling Address
          </Typography>
          <TextField
            fullWidth
            type="text"
            label="Name on Card"
            value={nameOnCard}
            onChange={(evt) => setNameOnCard(evt.target.value)}
            name="nameOnCard"
            required
          />
          <TextField
            fullWidth
            type="text"
            label="Line 1"
            value={billingAdress.line1}
            name="line1"
            onChange={(evt) => handleBilling(evt)}
          />
          <TextField
            fullWidth
            type="text"
            label="Line 2"
            value={billingAdress.line2}
            name="line2"
            onChange={(evt) => handleBilling(evt)}
            required
          />
          <TextField
            fullWidth
            type="text"
            label="City"
            value={billingAdress.city}
            name="city"
            onChange={(evt) => handleBilling(evt)}
            required
          />
          <TextField
            fullWidth
            type="text"
            label="State"
            value={billingAdress.state}
            name="state"
            onChange={(evt) => handleBilling(evt)}
            required
          />
          <TextField
            fullWidth
            type="text"
            label="Postal Code"
            value={billingAdress.postal_code}
            name="postal_code"
            onChange={(evt) => handleBilling(evt)}
            required
          />
          <div className="formRow checkoutInput">
            <CountryDropdown
              valueType="short"
              onChange={(val) =>
                handleBilling({
                  target: {
                    name: "country",
                    value: val,
                  },
                })
              }
              value={billingAdress.country}
              required
            />
          </div>
        </div>
        <div className="group">
          <Typography variant="h6" align="center">
            Card Details
          </Typography>
          <CardElement options={configCardElement} />
        </div>
        <Button
          variant="contained"
          size="large"
          color="primary"
          fullWidth
          type="submit"
        >
          Pay Now
        </Button>
      </form>
    </Paper>
  );
}

export default PaymentDetails;
