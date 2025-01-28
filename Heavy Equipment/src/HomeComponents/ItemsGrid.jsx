// components/ItemsGrid.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import excavator from "../../Assets/image11.jpeg";
import excavator from "../Assets/image11.jpg";
import forklift from "../Assets/image22.jpeg";
import miningLoader from "../Assets/image11.jpg";
import trucks from "../Assets/image22.jpg";

const items = [
  { name: "Excavator", image: excavator },
  { name: "Forklift", image: forklift },
  { name: "Mining Loader", image: miningLoader },
  { name: "Trucks", image: trucks },
];

const ItemsGrid = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate data fetching
        setTimeout(() => {
          setData(items);
          setLoading(false);
        }, 2000);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    navigate("/subcategories", { state: { category } });
  };

  return (
    <section className="py-5 bg-secondary text-white">
      <div className="container">
        <div className="row g-4">
          {error
            ? <div className="col-12 text-center"><p>{error}</p></div>
            : data.map((item, index) => (
                <div key={index} className="col-md-3">
                  <div className="card bg-dark text-white" style={{ minHeight: "400px" }}> {/* Further increase card height */}
                    <img
                      src={item.image}
                      className="card-img-top"
                      alt={item.name}
                      style={{ height: "150px", objectFit: "cover" }}
                    />
                    <div className="card-body text-center">
                      <h5 className="card-title">{item.name}</h5>
                      <button
                        className="btn btn-outline-warning btn-custom mt-2"
                        onClick={() => handleCategoryClick(item)}
                        style={{
                          borderRadius: "20px",
                          padding: "10px 20px",
                          transition: "background-color 0.3s, color 0.3s",
                          color: "white",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#ffc107";
                          e.currentTarget.style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "";
                          e.currentTarget.style.color = "";
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default ItemsGrid;
