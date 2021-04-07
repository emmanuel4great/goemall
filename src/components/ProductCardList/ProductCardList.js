import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/Cart/cart.actions";
import { Card, Fab, Typography, ButtonBase } from "@material-ui/core";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import StarRate from "@material-ui/icons/StarRate";

import "./styles.scss";

function ProductCardList(product) {
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
    <div className="productCardList">
      <div className="thumb">
        <Link to={`/product/${documentID}`}>
          <img src={productThumbnail} alt={productName} />
        </Link>
      </div>
      <div className="details">
        <div className="detailsTextWrap">
          <div className="nameWrap">
            <Typography
              variant="body2"
              component={Link}
              to={`/product/${documentID}`}
              //   noWrap
              color="textPrimary"
              className="name"
            >
              {productName}
            </Typography>
          </div>
          <div>
            <StarRate />
            <StarRate />
            <StarRate />
            <StarRate />
            <StarRate />
          </div>
          <Typography variant="body1">${productPrice}</Typography>
        </div>
      </div>
    </div>
  );
}

export default ProductCardList;
