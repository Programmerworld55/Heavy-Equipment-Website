import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/971528419198"
      className="btn btn-success"
      style={styles.whatsappButton}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaWhatsapp size={24} /> WhatsApp Us
    </a>
  );
};

const styles = {
  whatsappButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 20px",
    borderRadius: "50px",
    backgroundColor: "#25D366",
    color: "#fff",
    textDecoration: "none",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
};

export default WhatsAppButton;
