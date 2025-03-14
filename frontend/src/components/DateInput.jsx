import React from 'react';

const DateInput = ({ label, name, value, onChange, error }) => (
  <div className="form-group">
    <label>{label}</label>
    <input type="date" name={name} value={value} onChange={onChange} />
    {error && <span className="error">{error}</span>}
  </div>
);

export default DateInput;