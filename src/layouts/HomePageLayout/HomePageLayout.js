import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function HomePageLayout({ children }) {
  return (
    <div className="fullHeight">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
