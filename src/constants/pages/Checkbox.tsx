import React from 'react';
import CheckboxProps from './interfaces/CheckboxProps';

import './css/checkbox.less';

function Checkbox(values: CheckboxProps): JSX.Element {
  return (
    <React.Fragment>
      <div className="checkbox-container" >
        <input
          type="checkbox"
          name={`checkbox-${values.key ? values.key : 0}`}
          id={`checkbox-${values.key ? values.key : 0}`}
          onChange={values.onPress}
          defaultChecked={values.defaultChecked} />
        <label htmlFor={`checkbox-${values.key ? values.key : 0}`}>{values.text}</label>
      </div>
    </React.Fragment>
  );
}
export default Checkbox;