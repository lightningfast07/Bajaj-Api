import React, { useState, useEffect } from 'react';
import Select from 'react-select'; // Use a library like react-select for dropdown
import { FaShieldAlt } from 'react-icons/fa'; // Use FontAwesome or any other icon library

const DropdownComponent = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [data, setData] = useState([]); // State to hold fetched data
  const [filteredOutput, setFilteredOutput] = useState([]); // State to hold filtered output

  useEffect(() => {
    // Fetch data from API when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch(''); // Replace with your actual API endpoint
        const result = await response.json();
        setData(result); // Assuming result is an array of options in the form { label: '', value: '' }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const customStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? 'blue' : 'gray',
      boxShadow: state.isFocused ? '0 0 0 1px blue' : 'none',
      '&:hover': { borderColor: 'blue' },
    }),
    placeholder: (base) => ({
      ...base,
      color: 'gray',
    }),
    singleValue: (base) => ({
      ...base,
      color: 'black',
    }),
  };

  const handleFocus = () => {
    setIsFocus(true);
  };

  const handleBlur = () => {
    setIsFocus(false);
  };

  const handleChange = (selectedOption) => {
    setValue(selectedOption.value);
    setIsFocus(false);

    // Filter the output based on the selected value
    const filteredData = data.filter((item) => item.value === selectedOption.value);
    setFilteredOutput(filteredData); // Update the filtered output state
  };

  return (
    <div style={styles.container}>
      {value || isFocus ? (
        <p style={{ ...styles.label, color: isFocus ? 'blue' : 'black' }}>
          Dropdown label
        </p>
      ) : null}
      <Select
        styles={customStyles}
        options={data}
        placeholder={isFocus ? '...' : 'Select item'}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        value={data.find((item) => item.value === value)}
        isSearchable
        components={{
          DropdownIndicator: () => (
            <FaShieldAlt style={{ color: isFocus ? 'blue' : 'black', marginRight: 8 }} />
          ),
        }}
      />
      {/* Display filtered output */}
      <div>
        {filteredOutput.map((item, index) => (
          <p key={index}>{item.label}</p>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '200px',
    margin: 'auto',
    paddingTop: '50px',
  },
  label: {
    fontSize: '16px',
    marginBottom: '5px',
  },
};

export default DropdownComponent;
