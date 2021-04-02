import React from "react";
import { Button } from "@material-ui/core";
// import Button from "../forms/Button";

export default function LoadMore({ onLoadMoreEvt = () => {} }) {
  return (
    <div style={{ textAlign: "center" }}>
      <Button
        size="large"
        color="secondary"
        variant="contained"
        onClick={onLoadMoreEvt}
      >
        Load More
      </Button>
    </div>
  );
}
