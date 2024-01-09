import { useEffect } from "react"
import { Table } from "react-bootstrap";


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
                        <td>{historyItem.changedTimeStamp}</td>
                        <td>{historyItem.equipmentName}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </div>
        
    };

    return renderTable
}

export default FilterChangeHistory