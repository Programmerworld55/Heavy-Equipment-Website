import React, { useState, useEffect } from "react";
import { FaUsers, FaBox, FaHourglassHalf, FaCartArrowDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchUsersStats, fetchItemsStats, fetchApprovalsStats, fetchBookingsStats } from "./DashboardApi";
import ManageUsers from "./ManageUsers";
import ManageItems from "./ManageItems";
import Approvals from "./Approvals";
import Bookeditem from "./Bookeditem";

const StatCard = ({ title, value, icon, color, iconColor, onClick }) => {
  return (
    <div className="col-md-3 col-sm-6 mb-4 d-flex justify-content-center">
      <div className="card shadow-sm border-0" style={{ backgroundColor: color, cursor: "pointer", width: "24rem", height: "15rem", margin: "0 auto" }} onClick={onClick}>
        <div className="card-body text-center">
          <div className="mb-3" style={{ color: iconColor }}>{icon}</div>
          <h5 className="card-title">{title}</h5>
          <h3 className="card-text font-weight-bold">{value}</h3>
          <button className="btn btn-primary mt-3">View Details</button> {/* Changed button color */}
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    items: 0,
    approvals: 0,
    bookings: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const loadStats = async () => {
      try {
        const usersData = await fetchUsersStats();
        const itemsData = await fetchItemsStats();
        const approvalsData = await fetchApprovalsStats();
        const bookingsData = await fetchBookingsStats();

        setStats({
          users: usersData.users,
          items: itemsData.items,
          approvals: approvalsData.approvals,
          bookings: bookingsData.bookings,
        });
      } catch (error) {
        toast.error("Error fetching dashboard data", {
          position: "top-right",
          autoClose: 2000,
          transition: Slide,
        });
      }
    };

    loadStats();
  }, []);

  return (
    <div className="container mt-4" style={{ width: '100%', maxWidth: '100%' }}>
      <h2 className="mb-4 text-center" style={{ color: "#343a40" }}>Admin Dashboard</h2>
      <div className="row" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
        <StatCard
          title="Registered Users"
          value={<strong>{stats.users}</strong>}
          icon={<FaUsers className="fs-1" />}
          color="#e9ecef"
          iconColor="#007bff"
          onClick={() => navigate("/ManageUsers")}
        />
        <StatCard
          title="Total Items Listed"
          value={<strong>{stats.items}</strong>}
          icon={<FaBox className="fs-1" />}
          color="#e9ecef"
          iconColor="#28a745"
          onClick={() => navigate("/ManageItems")}
        />
        <StatCard
          title="Pending Approvals"
          value={<strong>{stats.approvals}</strong>}
          icon={<FaHourglassHalf className="fs-1" />}
          color="#e9ecef"
          iconColor="#ffc107"
          onClick={() => navigate("/Approvals")}
        />
        <StatCard
          title="Total Booked Items"
          value={<strong>{stats.bookings}</strong>}
          icon={<FaCartArrowDown className="fs-1" />}
          color="#e9ecef"
          iconColor="#dc3545"
          onClick={() => navigate("/Bookeditem")}
        />
      </div>
      <ToastContainer limit={1} />
    </div>
  );
};

export default Dashboard;
