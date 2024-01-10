import React, { useState } from 'react';
import AddEquipmentForm from '../AddEquipmentForm';
import AddFilterForm from '../AddFilterForm';
import EditEquipmentTable from '../EditEquipmentTable';
import { UserSettings } from '../UserSettings';
import '../styles/EditStyles.css';
import { useNavigate } from "react-router-dom";


export default function Edit() {
  const [selectedOption, setSelectedOption] = useState(null);

  const navigate = useNavigate();

  const renderComponent = () => {
    switch (selectedOption) {
      case 'userSettings':
        // Render User Settings component
        return <UserSettings />;
      case 'editEquipment':
        // Render Equipment Settings component
        return <EditEquipmentTable />;
      case 'addEquipment':
        // Render Add Equipment Form component
        return <AddEquipmentForm />;
      case 'addFilter':
        // Render Add Filter Form component
        return <AddFilterForm />;
      default:
        // Render a default component - Edit Equipment Table
        return <EditEquipmentTable />;
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="container-fluid">
      <div className="menu">
        <ul className="list-group">
          <li
            className="list-group-equipment d-flex justify-content-between align-equipments-center"
            onClick={() => handleOptionClick('userSettings')}
          >
            User Settings
            <span className="badge badge-primary badge-pill">&gt;</span>
          </li>
          <li
            className="list-group-equipment d-flex justify-content-between align-equipments-center"
            onClick={() => handleOptionClick('editEquipment')}
          >
            Edit Filter Information
            <span className="badge badge-primary badge-pill">&gt;</span>
          </li>
          <li
            className="list-group-equipment d-flex justify-content-between align-equipments-center"
            onClick={() => handleOptionClick('addEquipment')}
          >
            Add Equipment
            <span className="badge badge-primary badge-pill">&gt;</span>
          </li>
          <li
            className="list-group-equipment d-flex justify-content-between align-equipments-center"
            onClick={() => handleOptionClick('addFilter')}
          >
            Add Filter
            <span className="badge badge-primary badge-pill">&gt;</span>
          </li>
        </ul>
      </div>
      <div className="right-pane">{renderComponent()}</div>
    </div>
  );
}