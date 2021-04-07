import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/Cart/cart.actions";
import { Card, Fab, Typography, ButtonBase } from "@material-ui/core";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import StarRate from "@material-ui/icons/StarRate";

import "./styles.scss";

function ProductCard(product) {
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

  const handleAddToCart = (product) => {
    if (!product) return;
    dispatch(addProduct(product));
    history.push("/cart");
  };

  return (
    <Card className="productCard">
      <div className="thumb">
        <Link to={`/product/${documentID}`}>
          <img src={productThumbnail} alt={productName} />
        </Link>
      </div>
      <div className="details">
        <div className="detailsTextWrap">
          <Typography
            variant="h6"
            component={Link}
            to={`/product/${documentID}`}
            noWrap
            className="name"
          >
            {productName}
          </Typography>
          <div className="priceRate">
            <Typography variant="h6">${productPrice}</Typography>
            <div>
              <StarRate />
              <StarRate />
              <StarRate />
              <StarRate />
              <StarRate />
            </div>
          </div>

          <ButtonBase
            className="addToCartBtn"
            onClick={() => handleAddToCart(product)}
            focusRipple
          >
            <span>Add to Cart</span>
            <ShoppingCart />
          </ButtonBase>
        </div>
        {/* <div className="addToCart">
          <Fab
            onClick={() => handleAddToCart(product)}
            color="primary"
            size="small"
            disabledElevation
          >
            <ShoppingCart />
          </Fab>
        </div> */}
      </div>
    </Card>
  );
}

export default ProductCard;
