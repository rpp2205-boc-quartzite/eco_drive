import React, { useState } from "react";
import { Link } from 'react-router-dom';

const RadioButton = ({ label, value, onChange }) => {
  return (
    <label>
      <input type="radio" checked={value} onChange={onChange} />
      {label}
    </label>
  );
};

export default function SignUpSelect(props) {
  return (
    <div>
      <div>
        <RadioButton
          label='driver'
          value={props.favorite === 'driver'}
          onChange={props.handleDriverChange}
        />
        <RadioButton
          label='rider'
          value={props.favorite === 'rider'}
          onChange={props.handleRiderChange}
        />
      </div>
      {/* <div>
        <button>Next</button>
        <button>Go Back</button>
      </div> */}
    </div>
  );

} 