import React, { useState, useEffect } from "react";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductStart,
  fetchProductsStart,
  deleteProductStart,
} from "../../redux/Products/products.actions";
import LoadMore from "../../components/LoadMore";
import CKEditor from "ckeditor4-react";
import {
  Typography,
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Hidden,
  Fab,
  IconButton,
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Add from "@material-ui/icons/Add";
import Delete from "@material-ui/icons/Delete";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

function Admin(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { products } = useSelector(mapState);
  const { data, queryDoc, isLastPage } = products;

  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [productCategory, setProductCategory] = useState("mens");
  const [productName, setProductName] = useState("");
  const [productThumbnail, setProductThumbnail] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDesc, setProductDesc] = useState("");

  const toggleModal = () => {
    setModal((prev) => !prev);
  };

  const configModal = {
    open: modal,
    onClose: toggleModal,
  };

  const resetForm = () => {
    toggleModal();
    setProductCategory("mens");
    setProductName("");
    setProductThumbnail("");
    setProductPrice(0);
    setProductDesc("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addProductStart({
        productCategory,
        productName,
        productThumbnail,
        productPrice,
        productDesc,
      })
    );

    resetForm();
  };

  useEffect(() => {
    dispatch(fetchProductsStart());
    // eslint-disable-next-line
  }, []);

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        startAfterDoc: queryDoc,
        persistProducts: data,
      })
    );
  };

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  };

  return (
    <div className="admin">
      <div className="callToActions">
        <Typography variant="h5">Manage Products</Typography>
        <Hidden smDown>
          <Button
            onClick={() => toggleModal()}
            variant="contained"
            color="primary"
          >
            Add new product
          </Button>
        </Hidden>
        <Hidden mdUp>
          <Fab onClick={() => toggleModal()}>
            <Add />
          </Fab>
        </Hidden>
      </div>

      <Dialog fullScreen={fullScreen} {...configModal}>
        <DialogTitle>Add new product</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <div className="addNewProductForm">
              <FormControl fullWidth>
                <InputLabel id="category">Category</InputLabel>
                <Select
                  labelId="category"
                  label="Category"
                  onChange={(e) => setProductCategory(e.target.value)}
                >
                  <MenuItem value="womens">Women wear</MenuItem>
                  <MenuItem value="mens">Men wear</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Name"
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />

              <TextField
                fullWidth
                label="Main image URL"
                type="url"
                value={productThumbnail}
                onChange={(e) => setProductThumbnail(e.target.value)}
              />

              <TextField
                fullWidth
                label="Price"
                type="number"
                min="0.00"
                max="10000.00"
                step="0.01"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />

              <CKEditor
                onChange={(evt) => setProductDesc(evt.editor.getData())}
              />
              <br />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => toggleModal()} variant="outlined">
              Cancel
            </Button>
            <Button type="submit" color="primary" variant="contained">
              Add product
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <div className="manageProducts">
        <Table className="results">
          <TableBody>
            {Array.isArray(data) &&
              data.length > 0 &&
              data.map((product, index) => {
                const {
                  productName,
                  productThumbnail,
                  productPrice,
                  documentID,
                } = product;
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <img
                        className="thumb"
                        src={productThumbnail}
                        alt={productName}
                      />
                    </TableCell>
                    <TableCell>{productName}</TableCell>
                    <TableCell>${productPrice}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => dispatch(deleteProductStart(documentID))}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        {!isLastPage && <LoadMore {...configLoadMore} />}
      </div>
    </div>
  );
}

export default Admin;
