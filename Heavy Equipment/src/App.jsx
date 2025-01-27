import { Routes, Route } from "react-router-dom";
import Signup from "./MainPages/SignupPage";
import Login from "./MainPages/LoginPage";
import VerifyEmail from "./Components/VerifyEmail";
import Home from "./MainPages/HomePage";
// import ForgotPassword from "./Components/ForgetPasswordExtra";
import AdminPanel from "./MainPages/AdminPanel";
import ManageUsers from "./Components/AdminComponents/ManageUsers";
import 'bootstrap/dist/css/bootstrap.min.css';
import ManageItems from "./Components/AdminComponents/ManageItems";
import Approvals from "./Components/AdminComponents/Approvals";
import Bookeditem from "./Components/AdminComponents/Bookeditem";
import ContactUs from "./MainPages/ContactPage";
import AboutUs from "./MainPages/AboutPage";
import Footer from "./Components/Reuseable components/Footer";
import Navbar from "./Components/Reuseable components/Navbar";
import ServiceCards from "./Components/Reuseable components/support";
import UserDetails from "./Components/UserDetails";
import CheckoutPage from "./MainPages/CheckoutPage";
import SubcategoriesPage from "./MainPages/SubcategoriesPage"; // Import the new SubcategoriesPage component
import ConfirmationPage from "./MainPages/ConfirmationPage"; // Import the new ConfirmationPage component
// import ItemsPage from "./MainPages/ItemsPage";

function App() {
  return (
    <>
      {/* <ErrorBoundary> */}
        <Routes>
          {/* Public Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verifyEmail" element={<VerifyEmail />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/admin" element={<AdminPanel/>} />
          <Route path="/ManageUsers" element={<ManageUsers/>} />
          <Route path="/ManageItems" element={<ManageItems/>} />
          <Route path="/Approvals" element={<Approvals/>} />
          <Route path="/Approvals" element={<Approvals/>} />
          <Route path="/Bookeditem" element={<Bookeditem/>} />
          <Route path="/ContactUs" element={<ContactUs/>} />
          <Route path="/AboutUs" element={<AboutUs/>} />
          <Route path="/Footer" element={<Footer/>} />
          <Route path="/Navbar" element={<Navbar/>} />
          <Route path="/ServiceCards" element={<ServiceCards/>} />
          <Route path="/profile" element={<UserDetails/>} />
          <Route path="/checkout" element={<CheckoutPage/>} />
          <Route path="/subcategories" element={<SubcategoriesPage />} /> {/* Add this line */}
          <Route path="/confirmation" element={<ConfirmationPage />} /> {/* Add this line */}

          {/* <Route path="/item" element={<ServiceCards/>} /> */}

          {/* <Route path="/ForgotPassword" element={<ForgotPassword />} /> */}

          {/* Protected Routes */}
        </Routes>
      {/* </ErrorBoundary> */}
    </>
  );
}

export default App;