import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import moment from "moment";
import { useHistory } from "react-router-dom";

const columns = [
  { id: "orderCreatedDate", label: "Order Date" },
  {
    id: "documentID",
    label: "Order ID",
  },
  {
    id: "orderTotal",
    label: "Amount",
  },
];

const styles = {
  fontSize: "16px",
  cursor: "poiner",
  width: "10%",
};

const formatText = (columnName, columnValue) => {
  switch (columnName) {
    case "orderTotal":
      return `$${columnValue}`;
    case "orderCreatedDate":
      return moment(columnValue.nano).format("DD/MM/YYYY");
    default:
      return columnValue;
  }
};

function OrderHistory({ orders }) {
  const history = useHistory();
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col, pos) => {
              const { label } = col;
              return (
                <TableCell style={styles} key={pos}>
                  {label}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(orders) &&
            orders.length > 0 &&
            orders.map((row, pos) => {
              const { documentID } = row;
              return (
                <TableRow
                  key={pos}
                  onClick={() => history.push(`/order/${documentID}`)}
                >
                  {columns.map((col, pos) => {
                    const columnName = col.id;
                    const columnValue = row[columnName];
                    const formmatedText = formatText(columnName, columnValue);
                    return (
                      <TableCell style={styles} key={pos}>
                        {formmatedText}
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

export default OrderHistory;
