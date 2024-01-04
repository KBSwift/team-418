import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal } from "react-bootstrap";

const EquipmentTable = () => {
  const [equipment, setEquipment] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteEquipmentId, setDeleteEquipmentId] = useState(null);

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
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting equipment:", error);
    }
  };

  const openDeleteModal = (equipmentId) => {
    setDeleteEquipmentId(equipmentId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
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
                  onClick={() => openDeleteModal(equipmentItem.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showDeleteModal} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this equipment?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDelete(deleteEquipmentId)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EquipmentTable;