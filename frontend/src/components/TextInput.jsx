import React from 'react';

const TextInput = ({ label, name, value, onChange, error }) => (
  <div className="form-group">
    <label>{label}</label>
    <input type="text" name={name} value={value} onChange={onChange} />
    {error && <span className="error">{error}</span>}
  </div>
);

export default TextInput;