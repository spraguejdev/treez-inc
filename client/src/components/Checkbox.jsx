import React from 'react';

const Checkbox = ({ type = 'checkbox', name, isSelected = true, onChange }) => (
  <span
    style={{
      float: 'left',
      display: 'inline',
      paddingTop: '4px',
      paddingRight: '10px'
    }}
  >
    <input type={type} name={name} id={name} onChange={onChange} />
  </span>
);

export default Checkbox;
