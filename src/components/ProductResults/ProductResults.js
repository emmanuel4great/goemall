import React, { useEffect } from "react";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsStart } from "../../redux/Products/products.actions";
import Product from "./Product";

import { useHistory, useParams } from "react-router-dom";
import LoadMore from "../LoadMore";
import {
  Typography,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Divider,
} from "@material-ui/core";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

export default function ProductResults() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { filterType } = useParams();
  const { products } = useSelector(mapState);

  const { data, queryDoc, isLastPage } = products;

  const handleFilter = (e) => {
    const nextFilter = e.target.value;
    if (nextFilter === "all") {
      history.push(`/search`);
    } else {
      history.push(`/search/${nextFilter}`);
    }
  };

  useEffect(() => {
    dispatch(fetchProductsStart({ filterType }));
    // eslint-disable-next-line
  }, [filterType]);

  if (!Array.isArray(data)) return null;

  if (data.length < 1) {
    return (
      <div className="products">
        <p>No search results</p>
      </div>
    );
  }

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        filterType,
        startAfterDoc: queryDoc,
        persistProducts: data,
      })
    );
  };

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  };

  return (
    <div className="products">
      <div className="listHeader">
        <Typography variant="h5">Browse Products</Typography>

        <div className="filterWrap">
          <Typography variant="body1">Category:</Typography>
          <FormControl style={{ width: 150 }} variant="outlined">
            <InputLabel id="category">Select</InputLabel>
            <Select
              labelId="category"
              value={filterType || "all"}
              onChange={handleFilter}
              label="Select"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="womens">Women wear</MenuItem>
              <MenuItem value="mens">Men wear</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <Divider />
      <div className="productResults">
        {data.map((product, pos) => {
          const configProduct = { ...product };
          return <Product key={pos} {...configProduct} />;
        })}
      </div>
      {!isLastPage && <LoadMore {...configLoadMore} />}
    </div>
  );
}
