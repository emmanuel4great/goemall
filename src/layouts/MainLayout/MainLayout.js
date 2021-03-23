import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function MainLayout({ children, ...props }) {
  return (
    <div>
      <Header {...props} />
      <div className="main">{children}</div>
      <Footer />
    </div>
  );
}
