import React, { useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setOrderDetails } from "../../redux/Orders/orders.actions";

const columns = [
  {
    id: "productThumbnail",
    label: "",
  },
  {
    id: "productName",
    label: "Name",
  },
  {
    id: "productPrice",
    label: "Price",
  },
  {
    id: "quantity",
    label: "Quantity",
  },
];

const style = {
  fontSize: "16px",
  width: "100%",
};

const formatText = (columnName, columnValue) => {
  switch (columnName) {
    case "productPrice":
      return `$${columnValue}`;
    case "productThumbnail":
      return <img src={columnValue} width={250} />;
    default:
      return columnValue;
  }
};

function OrderDetails({ order }) {
  const orderItems = order && order.orderItems;
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setOrderDetails({}));
    };
  }, []);
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col, pos) => {
              return (
                <TableCell key={pos} style={style}>
                  {col.label}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(orderItems) &&
            orderItems.length > 0 &&
            orderItems.map((row, pos) => {
              return (
                <TableRow key={pos}>
                  {columns.map((col, pos) => {
                    const columnName = col.id;
                    const columnValue = row[columnName];
                    return (
                      <TableCell key={pos} style={style}>
                        {formatText(columnName, columnValue)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OrderDetails;
