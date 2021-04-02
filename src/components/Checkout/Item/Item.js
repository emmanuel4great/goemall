import React from "react";
import { useDispatch } from "react-redux";
import {
  removeCartItem,
  addProduct,
  reduceCartItem,
} from "../../../redux/Cart/cart.actions";
import { TableRow, TableCell, IconButton } from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";

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
        <img
          src={productThumbnail}
          alt={productName}
          style={{ width: 60, height: 60, objectFit: "cover" }}
        />
      </TableCell>
      <TableCell align="left">{productName}</TableCell>
      <TableCell align="left">
        <span
          className="cartBtn"
          onClick={() => handleReduceItem(product)}
        >{`< `}</span>
        <span>{quantity}</span>
        <span
          className="cartBtn"
          onClick={() => handleAddProduct(product)}
        >{` >`}</span>
      </TableCell>
      <TableCell align="left">${productPrice}</TableCell>
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
