import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./layouts/Navbar";
import FloatingContactMenu from "./layouts/FloatingContactMenu";
import BookingForm from "./Index/BookingForm";
import Footer from "./layouts/Footer";

const Landing = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      {/* <BookingForm /> */}
      <FloatingContactMenu />
      <Footer />
    </div>
  );
};

export default Landing;
