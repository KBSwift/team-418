import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';


function FilterChangeCard({userId}){

    // Load Data, putting data into empty array.

    const[equipmentData, setEquipmentData] = useState();
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);
    
    // the http request needs to fetch both equipment and filter data. Perhaps create custom query in back end to retrieve info based on user logged in. Example: `http://localhost:8080/api/user/${userId}/equipment-and-filters`

    useEffect(() => {
        axios.get('http://localhost:8080/api/equipment/1')
            .then(response => {
                console.log(response.data);
                setEquipmentData([response.data]);
                setLoading(false);
            })
            .catch(error => {
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

    //TO-DO Test data pull and data structure

    // renderDeck function will map over data array
    // TO-DO Needs testing for data load 
    // TO-DO Import Card into app.jsx(or relevant file) & configure routing
    // TO-DO Have butt

    const renderDeck = () => {
      return equipmentData.map(item => (    
        <div key={item.id} className="card" style={{width: '18rem'}}>
            <img></img>
            <div className="card-body">
                <h5 className="card-title">{item.name}</h5>

                {item.filters.map(filter => (
                    <div key={filter.id}>
                        <h6 className="card-subtitle mb-2 text-muted">Location: {filter.location}</h6>
                        <p className="card-text">Filter Size: {filter.length} x {filter.width} x {filter.height}</p>
                        <p className="card-text">Date of Last Change: {filter.dateOfLastChange}</p> 
                    </div>
                    ))}
                        <p className="card-text">Due Date: {item.filterLifeDays}</p>
                        <button type="button" class="btn">Change Now</button>
            </div>
        </div> 
        ));  
    };

    return (
        <div className="card-deck">
            {renderDeck()}
        </div>
    );
    

}

export default FilterChangeCard