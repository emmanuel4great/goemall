import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsStart } from "../../../redux/Products/products.actions";
import ProductCard from "../../ProductCard";
import { Grid } from "@material-ui/core";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

export default function SimilarProduct() {
  const dispatch = useDispatch();
  const { products } = useSelector(mapState);

  const { data } = products;

  useEffect(() => {
    dispatch(fetchProductsStart());
    // eslint-disable-next-line
  }, []);

  if (!Array.isArray(data)) return null;

  if (data.length < 1) {
    return (
      <div className="products">
        <p>No search results</p>
      </div>
    );
  }

  return (
    <div className="products">
      <Grid container spacing={3}>
        {data.map((product, pos) => {
          const configProduct = { ...product };
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={pos}>
              <ProductCard {...configProduct} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
