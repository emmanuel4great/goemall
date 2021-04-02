import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsStart } from "../../../redux/Products/products.actions";
import Product from "./../../ProductResults/Product";

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
      <div className="productResults">
        {data.map((product, pos) => {
          const configProduct = { ...product };
          return <Product {...configProduct} />;
        })}
      </div>
    </div>
  );
}
