import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../Styles/UserDetails.css"; // Import the custom CSS for styling

const UserDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    contactNo: "",
    alternateContactNo: "",
    gender: "",
    dateOfBirth: "",
    identityNumber: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [alertShown, setAlertShown] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("https://5d022ca3-6c3a-4dc9-8495-ff3dc768353e.mock.pstmn.io/profile");
        // const response = await fetch("https://5d022ca3-6c3a-4dc9-8495-ff3dc768353e.mock.pstmn.io/limitedprofile");

        const data = await response.json();
        const details = {
          name: data.name,
          email: data.email,
          address: {
            street: data.address?.street || "",
            city: data.address?.city || "",
            state: data.address?.state || "",
            postalCode: data.address?.postalCode || "",
            country: data.address?.country || "",
          },
          contactNo: data.contactNo || "",
          alternateContactNo: data.alternateContactNo || "",
          gender: data.gender || "",
          dateOfBirth: data.dateOfBirth || "",
          identityNumber: data.identityNumber || "",
        };
        setUserDetails(details);
        const allDetailsExist = Object.values(details).every(value => value);
        setIsComplete(allDetailsExist);
        setIsReadOnly(allDetailsExist);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (userDetails && !alertShown) {
      Swal.fire({
        icon: "info",
        title: isComplete ? "Review your details" : "Complete your details",
        text: isComplete ? "Please review your details and update if necessary." : "Please fill in the required fields to proceed.",
        confirmButtonText: "OK",
      });
      setAlertShown(true);
    }
  }, [userDetails, alertShown, isComplete]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    setIsUpdating(true);
    try {
      const response = await fetch("https://5d022ca3-6c3a-4dc9-8495-ff3dc768353e.mock.pstmn.io/update-user-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });
      if (!response.ok) {
        throw new Error("Failed to update user details");
      }
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "User details updated successfully",
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      });
      setIsReadOnly(true);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update user details",
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleEdit = () => {
    setIsReadOnly(false);
  };

  const handleNext = () => {
    const form = document.querySelector(".user-details-form");
    if (form.checkValidity()) {
      navigate("/checkout", { state: { userDetails } });
    } else {
      form.reportValidity();
    }
  };

  if (!userDetails) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="user-details-container">
      <div className="user-details-content" style={{ maxWidth: "100%" }}>
        <h2 className="text-center">{isComplete ? "Review Your Account Details" : "Complete Your Account Details"}</h2>
        <form onSubmit={handleUpdate} className="user-details-form mx-auto">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                value={userDetails.name}
                readOnly
              />
            </div>
            <div className="form-group col-md-6">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={userDetails.email}
                readOnly
              />
            </div>
          </div>
          <div className="form-group">
            <label>Contact No</label>
            <input
              type="text"
              className="form-control"
              value={userDetails.contactNo}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  contactNo: e.target.value,
                })
              }
              required={!isReadOnly}
              readOnly={isReadOnly}
              pattern="^\d{10,15}$"
              title="Please enter a valid contact number."
            />
          </div>
          <div className="form-group">
            <label>Street</label>
            <input
              type="text"
              className="form-control"
              value={userDetails.address.street}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  address: { ...userDetails.address, street: e.target.value },
                })
              }
              required={!isReadOnly}
              readOnly={isReadOnly}
              pattern="^[a-zA-Z0-9\s,.'\-]{3,}$"
              title="Please enter a valid street address."
            />
          </div>
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              className="form-control"
              value={userDetails.address.city}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  address: { ...userDetails.address, city: e.target.value },
                })
              }
              required={!isReadOnly}
              readOnly={isReadOnly}
              pattern="^[a-zA-Z\s]{2,}$"
              title="Please enter a valid city name."
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>State</label>
              <input
                type="text"
                className="form-control"
                value={userDetails.address.state}
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    address: { ...userDetails.address, state: e.target.value },
                  })
                }
                required={!isReadOnly}
                readOnly={isReadOnly}
                pattern="^[a-zA-Z\s]{2,}$"
                title="Please enter a valid state name."
              />
            </div>
            <div className="form-group col-md-4">
              <label>Country</label>
              <input
                type="text"
                className="form-control"
                value={userDetails.address.country}
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    address: { ...userDetails.address, country: e.target.value },
                  })
                }
                required={!isReadOnly}
                readOnly={isReadOnly}
                pattern="^[a-zA-Z\s]{2,}$"
                title="Please enter a valid country name."
              />
            </div>
            <div className="form-group col-md-1.5">
              <label>Postal Code</label>
              <input
                type="text"
                className="form-control"
                value={userDetails.address.postalCode}
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    address: { ...userDetails.address, postalCode: e.target.value },
                  })
                }
                required={!isReadOnly}
                readOnly={isReadOnly}
                pattern="^\d{5}(-\d{4})?$"
                title="Please enter a valid postal code."
              />
            </div>
          </div>
          <div className="form-group">
            <label>Alternate Contact No</label>
            <input
              type="text"
              className="form-control"
              value={userDetails.alternateContactNo}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  alternateContactNo: e.target.value,
                })
              }
              pattern="^\d{10,15}$"
              title="Please enter a valid contact number."
              readOnly={isReadOnly}
            />
          </div>
          <div className="form-group">
            <label>Identity Number</label>
            <input
              type="text"
              className="form-control"
              value={userDetails.identityNumber}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  identityNumber: e.target.value,
                })
              }
              required={!isReadOnly}
              readOnly={isReadOnly}
              pattern="^[a-zA-Z0-9]{5,20}$"
              title="Please enter a valid identity number."
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Gender</label>
              <select
                className="form-control"
                value={userDetails.gender}
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    gender: e.target.value,
                  })
                }
                required={!isReadOnly}
                disabled={isReadOnly}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group col-md-6">
              <label>Date of Birth</label>
              <input
                type="date"
                className="form-control"
                value={userDetails.dateOfBirth}
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    dateOfBirth: e.target.value,
                  })
                }
                required={!isReadOnly}
                readOnly={isReadOnly}
              />
            </div>
          </div>
          {isReadOnly ? (
            <>
              <button type="button" className="btn btn-primary mr-2 mb-2" onClick={handleEdit}>
                Edit
              </button>
              <button type="button" className="btn btn-primary mb-2" onClick={handleNext}>
                Next
              </button>
            </>
          ) : (
            <>
              <button type="submit" className="btn btn-primary mr-2 mb-2" disabled={isUpdating}>
                {isUpdating ? "Updating..." : "Update"}
              </button>
              {!isComplete && (
                <button type="button" className="btn btn-primary mb-2" onClick={handleNext}>
                  Next
                </button>
              )}
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserDetails;
