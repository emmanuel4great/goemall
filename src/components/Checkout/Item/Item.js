import React from "react";
import { useDispatch } from "react-redux";
import {
  removeCartItem,
  addProduct,
  reduceCartItem,
} from "../../../redux/Cart/cart.actions";
import { TableRow, TableCell, IconButton, Typography } from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import Add from "@material-ui/icons/Add";
import Remove from "@material-ui/icons/Remove";

function Item(product) {
  const dispatch = useDispatch();
  const {
    productName,
    productThumbnail,
    productPrice,
    quantity,
    documentID,
  } = product;

  const handleRemoveCartItem = (documentID) => {
    dispatch(removeCartItem({ documentID }));
  };

  const handleAddProduct = (product) => {
    dispatch(addProduct(product));
  };

  const handleReduceItem = (product) => {
    dispatch(reduceCartItem(product));
  };

  return (
    <TableRow>
      <TableCell align="left">
        <img src={productThumbnail} alt={productName} />
      </TableCell>
      <TableCell align="left">{productName}</TableCell>
      <TableCell align="center" style={{ whiteSpace: "nowrap" }}>
        <IconButton onClick={() => handleReduceItem(product)}>
          <Remove />
        </IconButton>

        <span className="tableQuantityWrap">{quantity}</span>

        <IconButton onClick={() => handleAddProduct(product)}>
          <Add />
        </IconButton>
      </TableCell>
      <TableCell align="left">
        <Typography variant="h6">${productPrice}</Typography>
      </TableCell>
      <TableCell align="center">
        <IconButton
          color="secondary"
          onClick={() => handleRemoveCartItem(documentID)}
        >
          <Delete />
        </IconButton>
        {/* <span
          onClick={() => handleRemoveCartItem(documentID)}
          className="cartBtn"
        >
          X
        </span> */}
      </TableCell>
    </TableRow>
  );
}

export default Item;
