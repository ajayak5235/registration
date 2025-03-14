import React from 'react';
import '../App.css';

const RadioButton = ({ label, name, value, options, onChange, error }) => (
    <div className="form-group">
      <label>{label}</label>
      <div className="radio-group">
        {options.map((option, index) => (
          <div key={index} className="radio-option">
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={onChange}
            />
            <span>{option}</span>
          </div>
        ))}
      </div>
      {error && <span className="error">{error}</span>}
    </div>
  );

export default RadioButton;