import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsStart } from "../../../redux/Products/products.actions";
import Product from "./../../ProductResults/Product";

import { useHistory, useParams } from "react-router-dom";
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

export default function SimilarProduct() {
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
  }, [filterType]);

  if (!Array.isArray(data)) return null;

  if (data.length < 1) {
    return (
      <div className="products">
        <p>No search results</p>
      </div>
    );
  }

  // const configFilters = {
  //   defaultValue: filterType,
  //   options: [
  //     {
  //       name: "Show all",
  //       value: "",
  //     },
  //     {
  //       name: "Mens",
  //       value: "mens",
  //     },
  //     {
  //       name: "Womens",
  //       value: "womens",
  //     },
  //   ],
  //   handleChange: handleFilter,
  // };

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
