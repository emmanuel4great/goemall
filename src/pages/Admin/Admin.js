import React, { useState, useEffect } from "react";

import FormInput from "../../components/forms/FormInput";
import FormSelect from "../../components/forms/FormSelect";

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
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";

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

  const toggleModal = (prev) => setModal(!prev);

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
        <Button onClick={() => toggleModal()}>Add new product</Button>
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
              {/* <FormSelect
                label="Category"
                options={[
                  {
                    value: "mens",
                    name: "Mens",
                  },
                  {
                    value: "womens",
                    name: "Womens",
                  },
                ]}
                handleChange={(e) => setProductCategory(e.target.value)}
              /> */}

              <TextField
                fullWidth
                label="Name"
                type="text"
                value={productName}
                handleChange={(e) => setProductName(e.target.value)}
              />

              <TextField
                fullWidth
                label="Main image URL"
                type="url"
                value={productThumbnail}
                handleChange={(e) => setProductThumbnail(e.target.value)}
              />

              <TextField
                fullWidth
                label="Price"
                type="number"
                min="0.00"
                max="10000.00"
                step="0.01"
                value={productPrice}
                handleChange={(e) => setProductPrice(e.target.value)}
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
            <Button
              type="submit"
              color="primary"
              variant="contained"
              color="primary"
            >
              Add product
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <div className="manageProducts">
        <table className="results">
          <tbody>
            <tr>
              <th>
                <h1>Manage Products</h1>
              </th>
            </tr>
            <tr>
              <td>
                <table>
                  <tbody>
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
                          <tr key={index}>
                            <td>
                              <img className="thumb" src={productThumbnail} />
                            </td>
                            <td>{productName}</td>
                            <td>${productPrice}</td>
                            <td>
                              <Button
                                onClick={() =>
                                  dispatch(deleteProductStart(documentID))
                                }
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td></td>
            </tr>
            <tr>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td>{!isLastPage && <LoadMore {...configLoadMore} />}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
