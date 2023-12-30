import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";

const EquipmentTable = () => {
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    loadEquipment();
  }, []);

  const loadEquipment = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/equipment");
      setEquipment(result.data);
    } catch (error) {
      console.error("Error loading equipment:", error);
    }
  };

  const handleDelete = async (equipmentId) => {
    try {
      await axios.delete(`http://localhost:8080/api/equipment/${equipmentId}`);
      loadEquipment();
    } catch (error) {
      console.error("Error deleting equipment:", error);
    }
  };

  return (
    <div className="table-pane">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Equipment ID</th>
            <th>Equipment Name</th>
            <th>Max Days Filter Life</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {equipment.map((equipmentItem) => (
            <tr key={equipmentItem.id}>
              <td>{equipmentItem.id}</td>
              <td>{equipmentItem.name}</td>
              <td>{equipmentItem.filterLifeDays}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(equipmentItem.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default EquipmentTable;