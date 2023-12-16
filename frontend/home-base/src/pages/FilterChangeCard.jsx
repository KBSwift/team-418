import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';


function FilterChangeCard({userId}){

    // Load Data

    const[data, setData] = useState(null);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);
    
    // the http request needs to fetch both equipment and filter data. Perhaps create custom query in back end to retrieve info based on user logged in. Example: `http://localhost:8080/api/user/${userId}/equipment-and-filters`

    useEffect(() => {
        axios.get(insert api endpoint)
        .then(response => {
            setData(response.data);
            setLoading(false);
        })
        .catch(error =>{
            setError(error);
            setLoading(false);
        });
    }, [userId]); // userId in dependency array for useEffect hook
        
    if(loading) {
        return <p>Loading...</p>
    }

    if(error) {
        return <p>Encoutered error: {error.message}. Please try again.</p>
    }

    // Extract info from data response.
    //TO-DO Test data pull and data structure

    const equipmentName = data.equipment.name;
    const filterLocation = data.location;
    const filterSize = '${data.length} x ${data.width} x ${data.height}';
    const dueDate = data.equipment.filterLifeDays;

    return(
        <div class="card" style={{width: '18rem'}}>
  <img></img>
 
 {/* TO-DO Fix the sample text to pull data */}
 {/* TO-DO Import Card into app.jsx & configure routing */}
  <div className="card-body">
    <h5 className="card-title">{equipmentName}</h5>
    <h6 className="card-subtitle mb-2 text-muted">{filterLocation}</h6>
    <p className="card-text">Filter Size: {filterSize}</p>
    <p className="card-text">Due Date: {dueDate}</p>
    <button type="button" class="btn">Change Now</button>
  </div>
</div>

    );

}

export default FilterChangeCard