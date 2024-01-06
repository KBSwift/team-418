import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal } from "react-bootstrap";
import "../components/styles/EditEquipmentTableStyles.css";
import { Link } from "react-router-dom";

export default function EditEquipmentTable() {
  const [equipment, setEquipment] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteFilterId, setDeleteFilterId] = useState(null);

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

  const handleDelete = async (filterId) => {
    try {
      await axios.delete(`http://localhost:8080/api/filters/${filterId}`);
      loadEquipment();
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting filter:", error);
    }
  };

  const openDeleteModal = (filterId) => {
    setDeleteFilterId(filterId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  }


  return (
    <div className="equipment-table-pane">
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
          {Array.isArray(equipment) && equipment.map((equipmentItem) =>
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
                    onClick={() => openDeleteModal(filter.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <Modal show={showDeleteModal} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this filter?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(deleteFilterId)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}