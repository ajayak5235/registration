import React from 'react';

const Dropdown = ({ label, name, value, options, onChange, error }) => (
  <div className="form-group">
    <label>{label}</label>
    <select name={name} value={value} onChange={onChange}>
      <option value="">Select {label}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
    {error && <span className="error">{error}</span>}
  </div>
);

export default Dropdown;