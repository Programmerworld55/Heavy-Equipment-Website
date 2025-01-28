import { Routes, Route } from "react-router-dom";
// import Signup from "./MainPages/SignupPage";
import Signup from "./MainPages/UserAuth/SignupPage"
// import Login from "./MainPages/LoginPage";
import Login from "./MainPages/UserAuth/LoginPage";
import VerifyEmail from "./MainPages/UserAuth/VerifyEmail";
import Home from "./MainPages/HomePage";
// import ForgotPassword from "./Components/ForgetPasswordExtra";
import AdminPanel from "./MainPages/AdminPanel";
import ManageUsers from "./Admin/AdminComponents/ManageUsers";
import 'bootstrap/dist/css/bootstrap.min.css';
// import ManageItems from "./Components/AdminComponents/ManageItems";
import ManageItems from "./Admin/AdminComponents/ManageItems";
// import Approvals from "./Components/AdminComponents/Approvals";
import Approvals from "./Admin/AdminComponents/Approvals";
// import Bookeditem from "./Components/AdminComponents/Bookeditem";
import Bookeditem from "./Admin/AdminComponents/Bookeditem";

import ContactUs from "./MainPages/Components/ContactPage";
import AboutUs from "./MainPages/Components/AboutPage";
// import ServiceCards from "./Components/Reuseable components/support";
import UserDetails from "./MainPages/UserComponents/UserDetails";
import CheckoutPage from "./MainPages/ItemComponents/CheckoutPage";
import SubcategoriesPage from "./HomeComponents/SubcategoriesPage"; // Import the new SubcategoriesPage component
import ConfirmationPage from "./MainPages/ItemComponents/ConfirmationPage"; // Import the new ConfirmationPage component
import ErrorPage from "./MainPages/ErrorPage"; 
// Import the new ErrorPage component
// import ProtectedRoute from "./Components/ProtectedRoute"; // Import the new ProtectedRoute component
import AdminRoute from "./MainPages/Auth/AdminRoute"; // Import the new AdminRoute component
// import SubcategoryDetailsPage from "./HomeComponents/SubcategoryDetailsPage"; // Import the new SubcategoryDetailsPage component
// import ItemsPage from "./MainPages/ItemsPage";
import SubcategoryDetail from "./HomeComponents/SubcategoryDetail"; // Import the new SubcategoryDetail component

function App() {
  const isAuthenticated = !!localStorage.getItem("token"); // Check if token exists
  const userRole = JSON.parse(localStorage.getItem("user"))?.role; // Get user role from localStorage

  return (
    <>
      {/* <ErrorBoundary> */}
        <Routes>
          {/* Public Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verifyEmail" element={<VerifyEmail />} />
          <Route path="/" element={<Home />} />
          <Route path="/ContactUs" element={<ContactUs/>} />
          <Route path="/AboutUs" element={<AboutUs/>} />
          {/* <Route path="/Footer" element={<Footer/>} /> */}
          {/* <Route path="/Navbar" element={<Navbar/>} /> */}
          {/* <Route path="/ServiceCards" element={<ServiceCards/>} /> */}
          <Route path="/profile" element={<UserDetails/>} />
          <Route path="/checkout" element={<CheckoutPage/>} />
          <Route path="/subcategories" element={<SubcategoriesPage />} /> {/* Add this line */}
          <Route path="/confirmation" element={<ConfirmationPage />} /> {/* Add this line */}
          <Route path="/subcategory-detail" element={<SubcategoryDetail />} /> {/* Add this line */}
          <Route path="*" element={<ErrorPage />} /> {/* Add this line for handling inappropriate URLs */}

          {/* Protected Routes */}
          <Route path="/admin" element={<AdminRoute element={AdminPanel} />} />
          <Route path="/ManageUsers" element={<AdminRoute element={ManageUsers} />} />
          <Route path="/ManageItems" element={<AdminRoute element={ManageItems} />} />
          <Route path="/Approvals" element={<AdminRoute element={Approvals} />} />
          <Route path="/Bookeditem" element={<AdminRoute element={Bookeditem} />} />
        </Routes>
      {/* </ErrorBoundary> */}
    </>
  );
}

export default App;