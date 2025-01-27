import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserAlt, FaUsers, FaLock } from "react-icons/fa";
import image1 from "../../Assets/service1.jpeg";
import image2 from "../../Assets/service2.jpeg";
import image3 from "../../Assets/service3.jpeg";



const ServiceCards = () => {
  const services = [
    {
      icon: <FaUserAlt size={40} color="white" />,
      title: "Customer Support",
      image: image1, // Replace with your image URL
    },
    {
      icon: <FaUsers size={40} color="white" />,
      title: "Experts Employees",
      image: image2, // Replace with your image URL
    },
    {
      icon: <FaLock size={40} color="white" />,
      title: "Secure Service",
      image: image3, // Replace with your image URL
    },
  ];

  return (
    <div className="container mt-5">
      <div className="row">
        {services.map((service, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div
              className="card h-100 shadow"
              style={{
                border: "2px solid white",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <img
                src={service.image}
                alt={service.title}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div
                className="card-body text-center"
                style={{ backgroundColor: "#002147", color: "yellow" }}
              >
                <div className="mb-3">{service.icon}</div>
                <h5 className="card-title" style={{ color: "yellow" }}>{service.title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceCards;