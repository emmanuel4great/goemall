import React from "react";
import Button from "../../forms/Button";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../redux/Cart/cart.actions";
import { Card, Fab, Typography } from "@material-ui/core";
import ShoppingCart from "@material-ui/icons/ShoppingCart";

function Product(product) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { documentID, productThumbnail, productName, productPrice } = product;
  if (
    !documentID ||
    !productThumbnail ||
    !productName ||
    typeof productPrice === "undefined"
  )
    return null;

  const configAddToCartBtn = {
    type: "button",
  };
  const handleAddToCart = (product) => {
    if (!product) return;
    dispatch(addProduct(product));
    history.push("/cart");
  };

  return (
    <div className="product">
      <Card>
        <div className="thumb">
          <Link to={`/product/${documentID}`}>
            <img src={productThumbnail} alt={productName} />
          </Link>
        </div>
        <div className="details">
          <ul>
            <li>
              <Typography
                variant="h5"
                component={Link}
                to={`/product/${documentID}`}
              >
                {productName}
              </Typography>
            </li>
            <li>
              <Typography variant="body1" color="secondary" className="">
                ${productPrice}
              </Typography>
            </li>
          </ul>
          <div className="addToCart">
            {/* <Button
                  {...configAddToCartBtn}
                  onClick={() => handleAddToCart(product)}
                >
                  Add to cart
                </Button> */}
            <Fab
              onClick={() => handleAddToCart(product)}
              color="primary"
              size="small"
            >
              <ShoppingCart />
            </Fab>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Product;
