import React from 'react';

const Checkbox = ({ type = 'checkbox', name, checked = 'false', isSelected = true, onChange }) => (
  <span
    style={{
      float: 'left',
      display: 'inline',
      paddingTop: '4px',
      paddingRight: '10px'
    }}
  >
    <input type={type} name={name} checked={checked} onChange={onChange} />
  </span>
);

export default Checkbox;
