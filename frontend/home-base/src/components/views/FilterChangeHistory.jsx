import { useEffect, useState } from "react"
import { Table } from "react-bootstrap";
import axios from "axios";


function FilterChangeHistory() {

    const[filterChangeHistory, setFilterChangeHistory] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);

    useEffect(() => {
        loadHistory();
      }, []);

      const loadHistory = async () => {
        try {
          const response = await axios.get("http://localhost:8080/api/filter-history");
          console.log(response.data);
          setFilterChangeHistory(response.data);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };  

    if(loading) {
        return <p>Loading...</p>
    }

    if(error) {
        return <p>Encoutered error: {error.message}. Please try again.</p>
    }

    const renderTable = () => {
        if(filterChangeHistory.length === 0) {
            return (
                <Alert variant="info">
                    No data available.
                </Alert>
                );
            }
            
            return (
        <div>
            <h2>Filter Change History</h2>
            <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Date of Change</th>
                    <th>Equipment</th>
                </tr>
            </thead>
            <tbody>
                {filterChangeHistory.map((historyItem, index) => (
                    <tr key={index}>
                        <td>{new Date(historyItem.changedTimeStamp).toLocaleDateString()}</td>
                        <td>{historyItem.equipmentName}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </div>
        
        );
    };

    return renderTable();
}

export default FilterChangeHistory