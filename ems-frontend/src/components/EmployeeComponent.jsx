import React, { useState, useEffect } from "react";
import {
  createEmployee,
  getEmployeeById,
  updateEmployee,
} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const { id } = useParams(); // Get the employee ID from the URL parameters
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      // Fetch employee data by ID and populate the form fields
      getEmployeeById(id)
        .then((response) => {
          const employee = response.data;
          setFirstName(employee.firstName);
          setLastName(employee.lastName);
          setEmail(employee.email);
        })
        .catch((error) => {
          console.error("Error fetching employee data:", error);
        });
    }
  }, [id]);

  function saveOrUpdateEmployee(event) {
    event.preventDefault();
    const employee = { firstName, lastName, email };
    console.log(employee);
    if (validateForm()) {
      if (id) {
        updateEmployee(id, employee)
          .then((response) => {
            console.log(response.data);
            navigator("/employees");
          })
          .catch((error) => {
            console.error("Error updating employee:", error);
          });
      } else {
        createEmployee(employee)
          .then((response) => {
            console.log(response.data);
            navigator("/employees");
          })
          .catch((error) => {
            console.error("Error creating employee:", error);
          });
      }
    }
  }

  function validateForm() {
    let isValid = true;
    const errorsCopy = { ...errors };

    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First name is required ";
      isValid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last name is required ";
      isValid = false;
    }

    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email is required ";
      isValid = false;
    }

    setErrors(errorsCopy);
    return isValid;
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update Employee</h2>;
    } else {
      return <h2 className="text-center">Add Employee</h2>;
    }
  }
  return (
    <div className="container">
      <div className="card-body col-md-6 offset-md-3">
        {pageTitle()}
        <form>
          <div className="form-group mb-2">
            <label className="form-label">First Name:</label>
            <input
              type="text"
              placeholder="Enter First Name"
              name="firstName"
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
            {errors.firstName && (
              <div className="invalid-feedback">{errors.firstName}</div>
            )}
          </div>

          <div className="form-group mb-2">
            <label className="form-label">Last Name:</label>
            <input
              type="text"
              placeholder="Enter Last Name"
              name="lastName"
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
            {errors.lastName && (
              <div className="invalid-feedback">{errors.lastName}</div>
            )}
          </div>

          <div className="form-group mb-2">
            <label className="form-label">Email ID:</label>
            <input
              type="email"
              placeholder="Enter Email Address"
              name="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          <button
            className="btn btn-success"
            type="submit"
            onClick={saveOrUpdateEmployee}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeComponent;
