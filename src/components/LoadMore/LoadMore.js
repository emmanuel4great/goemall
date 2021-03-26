import React from "react";
import Button from "../forms/Button";

export default function LoadMore({ onLoadMoreEvt = () => {} }) {
  return (
    <div>
      <Button onClick={onLoadMoreEvt}>LoadMore</Button>
    </div>
  );
}
