import React, { useEffect } from "react";
import "./styles.scss";
import { useParams, useHistory, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductStart,
  setProduct,
} from "../../redux/Products/products.actions";

import { addProduct } from "../../redux/Cart/cart.actions";
import { Typography, Button, Divider, Breadcrumbs } from "@material-ui/core";
import SimilarProduct from "./SimilarProduct";

const mapState = (state) => ({
  product: state.productsData.product,
});
function ProductContainer() {
  const { productID } = useParams();
  const location = useLocation();

  const history = useHistory();

  const dispatch = useDispatch();
  const { product } = useSelector(mapState);

  const {
    productName,
    productThumbnail,
    productPrice,
    productDesc,
    productCategory,
  } = product;

  useEffect(() => {
    dispatch(fetchProductStart(productID));
    return () => {
      dispatch(setProduct({}));
    };
    // eslint-disable-next-line
  }, [location.pathname]);

  const handleAddToCart = (product) => {
    if (!product) return;
    dispatch(addProduct(product));
    history.push("/cart");
  };

  return (
    <div className="productContainer">
      <div className="breadcrumb">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography component={Link} color="inherit" to="/search">
            All
          </Typography>
          <Typography component={Link} color="inherit" to="/search">
            {productCategory === "mens" ? "Men" : "Women"}
          </Typography>
          <Typography color="textPrimary">{productName}</Typography>
        </Breadcrumbs>
      </div>
      <div className="cardBody">
        <div>
          <div className="hero">
            <img src={productThumbnail} alt={productName} />
          </div>
          <div className="addToCartDesktop">
            <img src="/images/love.gif" height="30" alt="" />
            <Typography color="textSecondary">Love it</Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => handleAddToCart(product)}
            >
              Add to cart
            </Button>
          </div>
        </div>
        <div className="productDetails">
          <ul>
            <li>
              <Typography variant="h4">{productName}</Typography>
            </li>
            <li>
              <Typography variant="h5" color="error">
                ${productPrice}
              </Typography>
              <Divider />
            </li>
            <li>
              <Typography variant="h6">Product Features</Typography>
              <Typography
                variant="body2"
                dangerouslySetInnerHTML={{ __html: productDesc }}
              />
            </li>
          </ul>
          <div className="addToCart">
            <img src="/images/love.gif" height="30" alt="" />
            <Typography color="textSecondary">Love it</Typography>
            <div style={{ textAlign: "right" }}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => handleAddToCart(product)}
              >
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Divider />
      <div className="similarProduct">
        <Typography variant="h5" align="center">
          Products you might also like
        </Typography>
        <SimilarProduct />
      </div>
    </div>
  );
}

export default ProductContainer;
