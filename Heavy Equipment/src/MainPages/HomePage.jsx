// pages/Home.js
import React from "react";
import Navbar from "./Components/Navbar";
import HeroSection from "./Components/Herosection";
import Footer from "./Components/Footer";
import ItemsPage from "../MainPages/../HomeComponents/ItemsPage";
import WhatsAppButton from "./Components/WhatsAppButton";

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ItemsPage/>
      <WhatsAppButton />
      <Footer />
    </>
  );
};

export default Home;
