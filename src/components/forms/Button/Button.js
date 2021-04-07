import React from "react";
import "./styles.scss";

export default function Button({ children, ...props }) {
  return (
    <button className="btn" {...props}>
      {children}
    </button>
  );
}
