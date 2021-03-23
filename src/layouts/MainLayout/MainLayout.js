import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function MainLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="main">{children}</div>
      <Footer />
    </div>
  );
}
