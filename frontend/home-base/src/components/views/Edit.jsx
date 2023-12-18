import React, { useEffect, useState } from 'react';
import axios from "axios";
import '../styles/EditStyles.css'

export default function Edit() {

  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    loadEquipment();
  },[]);

  const loadEquipment = async () => {
    const result = await axios.get("http://localhost:8080/api/equipment")
    console.log(result.data);
    setEquipment(result.data);
  };

  const equipmentTableDetails = 
    equipment.map((item, index)=> {
      return <tr key={index}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.filterLifeDays}</td>
        { item.filters.map((filter, id) => {
            return <>
              <td key={id}>{filter.location}</td>
              <td>{filter.length}</td>
              <td>{filter.width}</td>
              <td>{filter.height}</td>
              <td>{filter.dateOfLastChange}</td>
            </>
          })}
        <td>
          <button>Edit</button>
          <button>Delete</button>
        </td>
      </tr>
    })

  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="container-fluid">
      <div className="menu">
        <ul className="list-group">
          <a>
            <li className="list-group-equipment d-flex justify-content-between align-equipments-center">
            User Settings
              <span className="badge badge-primary badge-pill">&gt;</span>
            </li>
          </a>
          <a>
            <li className="list-group-equipment d-flex justify-content-between align-equipments-center">
              Equipment Settings
              <span className="badge badge-primary badge-pill">&gt;</span>
            </li>
          </a>
          <a>
            <li className="list-group-equipment d-flex justify-content-between align-equipments-center">
              Add Equipment
              <span className="badge badge-primary badge-pill">&gt;</span>
            </li>
          </a>
          <a href={"/signup"}>
            <li className="list-group-equipment d-flex justify-content-between align-equipments-center">
              Register New User
              <span className="badge badge-primary badge-pill">&gt;</span>
            </li>
          </a>
        </ul>
      </div>

      <div className="table-pane">
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Equipment Name</th>
              <th scope="col">Max Days Filter Life</th>
              <th scope="col">Filter Location</th>
              <th scope="col">Filter Length</th>
              <th scope="col">Filter Width</th>
              <th scope="col">Filter Height</th>
              <th scope="col">Filter Date of Last Change</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {equipmentTableDetails}
          </tbody>
        </table>
      </div>
    </div>
)}