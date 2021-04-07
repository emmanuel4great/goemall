import React, { useEffect } from "react";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsStart } from "../../redux/Products/products.actions";
import ProductCard from "../ProductCard";

import { useHistory, useParams } from "react-router-dom";
import LoadMore from "../LoadMore";
import {
  Typography,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Divider,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  TextField,
  Toolbar,
  Hidden,
} from "@material-ui/core";

import ExpandMore from "@material-ui/icons/ExpandMore";
import Search from "@material-ui/icons/Search";
import ProductCardList from "../ProductCardList";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

export default function ProductResults() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { filterType } = useParams();
  const { products } = useSelector(mapState);

  const { data, queryDoc, isLastPage } = products;

  const handleFilter = (value) => () => {
    if (value === "all") {
      history.push(`/search`);
    } else {
      history.push(`/search/${value}`);
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
        <Toolbar>
          <Typography variant="h5" color="textPrimary">
            Browse Products
          </Typography>
        </Toolbar>
        <Divider />
        <div className="wrap">
          <Grid container spacing={3}>
            <Grid item sm={3}>
              <Accordion classes={{ root: "accordion" }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  Category
                </AccordionSummary>
                <AccordionDetails>
                  <div style={{ flex: 1 }}>
                    <ListItem button onClick={handleFilter("all")}>
                      All
                    </ListItem>
                    <ListItem button onClick={handleFilter("mens")}>
                      Men
                    </ListItem>
                    <ListItem button onClick={handleFilter("womens")}>
                      Women
                    </ListItem>
                  </div>
                </AccordionDetails>
              </Accordion>
              <div className="featuredProduct">
                <Typography variant="h6">Featured Product</Typography>
                <div className="titleUnderline">
                  <div className="subUnderline" />
                </div>
                <div className="productStateList">
                  {data.map((product, pos) => {
                    const configProduct = { ...product };
                    if (pos > 3) return;
                    return (
                      <div className="productCardWrap">
                        <ProductCardList {...configProduct} key={pos} />
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* <div className="filterWrap">
              <Typography variant="body1">Category:</Typography>
              <FormControl variant="outlined">
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
            </div> */}
            </Grid>
            <Grid item sm={9} className="searchResultGrid">
              <Hidden smDown>
                <Divider />
                <div className="searchSortHeader">
                  <TextField
                    label="Search Product"
                    InputProps={{
                      endAdornment: <Search color="textSecondary" />,
                    }}
                  />
                  <FormControl>
                    <InputLabel id="sort">Sort</InputLabel>
                    <Select
                      labelId="sort"
                      value={filterType || "all"}
                      onChange={handleFilter}
                      label="Sort"
                    >
                      <MenuItem value="mens">Newest</MenuItem>
                      <MenuItem value="all">Lowest Price First</MenuItem>
                      <MenuItem value="womens">Higest Price First</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <Divider />
              </Hidden>

              <div className="productResults">
                <Grid container spacing={3}>
                  {data.map((product, pos) => {
                    const configProduct = { ...product };
                    return (
                      <Grid item xs={12} sm={6} md={4}>
                        <ProductCard key={pos} {...configProduct} />
                      </Grid>
                    );
                  })}
                </Grid>
              </div>

              <div className="moreBtn">
                {!isLastPage && <LoadMore {...configLoadMore} />}
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}
