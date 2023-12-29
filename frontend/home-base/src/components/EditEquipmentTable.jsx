import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import "../components/styles/EditEquipmentTableStyles.css";
import { Link } from "react-router-dom";

export default function EditEquipmentTable() {
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    loadEquipment();
  }, []);

  const loadEquipment = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/equipment");
      console.log(result.data);
      setEquipment(result.data);
    } catch (error) {
      console.error("Error loading equipment:", error);
    }
  };

  const deleteFilter = async (filterId) => {
    await axios.delete(`http://localhost:8080/api/filters/${filterId}`);
    loadEquipment();
  };

  return (
    <div className="table-pane">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Equipment ID</th>
            <th>Equipment Name</th>
            <th>Max Days Filter Life</th>
            <th>Filter ID</th>
            <th>Filter Location</th>
            <th>Filter Length</th>
            <th>Filter Width</th>
            <th>Filter Height</th>
            <th>Filter Date of Last Change</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {equipment.map((equipmentItem) =>
            equipmentItem.filters.map((filter) => (
              <tr key={filter.id}>
                <td>{equipmentItem.id}</td>
                <td>{equipmentItem.name}</td>
                <td>{equipmentItem.filterLifeDays}</td>
                <td>{filter.id}</td>
                <td>{filter.location}</td>
                <td>{filter.length}</td>
                <td>{filter.width}</td>
                <td>{filter.height}</td>
                <td>{filter.dateOfLastChange}</td>
                <td>
                  <Link
                    className="btn btn-primary btn-sm btn-block"
                    to={`/editFilter/${filter.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger btn-sm btn-block"
                    onClick={() => deleteFilter(filter.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}