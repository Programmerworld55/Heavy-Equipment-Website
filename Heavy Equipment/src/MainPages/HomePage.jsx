// pages/Home.js
import React from "react";
import Navbar from "../Components/Reuseable components/Navbar";
import HeroSection from "../Components/Reuseable components/Herosection";
import Footer from "../Components/Reuseable components/Footer";
import ItemsPage from "./ItemsPage";
import WhatsAppButton from "../Components/Reuseable components/WhatsAppButton";

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
