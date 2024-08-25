import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
    setError('');
  };

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      const result = await axios.post('http://your-backend-url/api', parsedInput);
      setResponse(result.data);
    } catch (err) {
      setError('Invalid JSON format or API error');
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelectedOptions(prev => 
      checked ? [...prev, value] : prev.filter(option => option !== value)
    );
  };

  const filteredResponse = () => {
    if (!response) return null;

    let filteredData = [];
    if (selectedOptions.includes('Alphabets')) {
      filteredData = filteredData.concat(response.alphabets || []);
    }
    if (selectedOptions.includes('Numbers')) {
      filteredData = filteredData.concat(response.numbers || []);
    }
    if (selectedOptions.includes('Highest lowercase alphabet')) {
      filteredData = filteredData.concat(response.highestLowercase || []);
    }
    return filteredData.join(',');
  };

  return (
    <div className="App">
      <div className='title'>
        <h1>21BCE1780</h1>
      </div>
      
      <div className='text-area'>
        <textarea 
          placeholder="Enter JSON"
          value={jsonInput}
          onChange={handleInputChange}
        />
      </div>

      <div className='submit-button'>
        <button onClick={handleSubmit}>Submit</button>
      </div>

      <div className="container mt-5">
        <h3>Select Items</h3>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="Alphabets" id="alphabets" onChange={handleCheckboxChange} />
          <label className="form-check-label" htmlFor="alphabets">
            Alphabets
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="Numbers" id="numbers" onChange={handleCheckboxChange} />
          <label className="form-check-label" htmlFor="numbers">
            Numbers
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="Highest lowercase alphabet" id="highestLowercase" onChange={handleCheckboxChange} />
          <label className="form-check-label" htmlFor="highestLowercase">
            Highest lowercase alphabet
          </label>
        </div>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <div>
          <h3>Filtered Response</h3>
          <p>{filteredResponse()}</p>
        </div>
      )}
    </div>
  );
}

export default App;
