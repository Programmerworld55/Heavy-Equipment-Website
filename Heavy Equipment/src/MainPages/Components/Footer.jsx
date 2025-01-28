import "../../Styles/Footer.css"
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4" style={styles.footer}>
      <Container>
        <Row>
          <Col md={4} className="text-center text-md-left mb-3 mb-md-0">
            <h5>About Us</h5>
            <p>
              We provide high-quality heavy equipment for various industries. Our mission is to deliver excellence through our products and services.
            </p>
          </Col>
          <Col md={4} className="text-center mb-3 mb-md-0">
            <h5>Follow Us</h5>
            <div className="d-flex justify-content-center">
              <a href="#" className="text-white mx-2" style={styles.link} onMouseEnter={(e) => e.target.style.color = styles.linkHover.color} onMouseLeave={(e) => e.target.style.color = styles.link.color}><FaFacebook size={24} /></a>
              <a href="#" className="text-white mx-2" style={styles.link} onMouseEnter={(e) => e.target.style.color = styles.linkHover.color} onMouseLeave={(e) => e.target.style.color = styles.link.color}><FaTwitter size={24} /></a>
              <a href="#" className="text-white mx-2" style={styles.link} onMouseEnter={(e) => e.target.style.color = styles.linkHover.color} onMouseLeave={(e) => e.target.style.color = styles.link.color}><FaInstagram size={24} /></a>
              <a href="#" className="text-white mx-2" style={styles.link} onMouseEnter={(e) => e.target.style.color = styles.linkHover.color} onMouseLeave={(e) => e.target.style.color = styles.link.color}><FaLinkedin size={24} /></a>
            </div>
          </Col>
          <Col md={4} className="text-center text-md-right">
            <h5>Contact Us</h5>
            <p>Email: info@ezmine.com</p>
            <p>Phone: +123 456 7890</p>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <p className="mb-0">© 2025 EZMINE. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

const styles = {
  footer: {
    position: "relative",
    width: "100%",
    bottom: 0,
    marginTop: "auto", // Ensure footer stays at the bottom
  },
  link: {
    color: "white",
    textDecoration: "none",
    transition: "color 0.3s",
  },
  linkHover: {
    color: "pink",
  },
};

export default Footer;
