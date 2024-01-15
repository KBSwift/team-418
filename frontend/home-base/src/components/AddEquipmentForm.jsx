import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EquipmentTable from "./EquipmentTable";
import './styles/AddFormStyles.css';

const AddEquipmentForm = () => {
  
  const [equipment, setEquipment] = useState({
    id: "",
    name: "",
    filterLifeDays: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEquipment({ ...equipment, [name]: value });
  };

  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate name
    if (
      !equipment.name.trim() ||
      equipment.name.trim().length < 2 ||
      equipment.name.trim().length > 50
    ) {
      newErrors.name =
        "Name is required and must be between 2 and 50 characters.";
      isValid = false;
    }

    // Validate filterLifeDays
    if (
      !equipment.filterLifeDays ||
      parseFloat(equipment.filterLifeDays) <= 0
    ) {
      newErrors.filterLifeDays =
        "Filter Life in Days is required and must be a positive number.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const saveEquipment = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/equipment",
          equipment
        );
        //console.log(response.data);
      } catch (error) {
        // Handle errors
        console.error("Error:", error);
      } finally {
        navigate(0);
      }
    }
  };

  return (
    <div className="equipment-form">
      <EquipmentTable />
      <form>
        <div className="form-group">
          <label htmlFor="name">Equipment Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={equipment.name}
            onChange={handleChange}
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="filterLifeDays">Filter Life in Days:</label>
          <input
            type="number"
            id="filterLifeDays"
            name="filterLifeDays"
            value={equipment.filterLifeDays}
            onChange={handleChange}
            className={`form-control ${
              errors.filterLifeDays ? "is-invalid" : ""
            }`}
          />
          {errors.filterLifeDays && (
            <div className="invalid-feedback">{errors.filterLifeDays}</div>
          )}
        </div>
        <button className="btn btn-success" onClick={(e) => saveEquipment(e)}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddEquipmentForm;