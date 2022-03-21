import React from "react";
import NavigationButtonProps from "./interfaces/NavigationButtonProps";
import NavigationButtonType from "./enums/NavigationButtonType";

import './css/navigationButton.less'

function NavigationButton(value: NavigationButtonProps): JSX.Element {
  switch (value.type) {
    case NavigationButtonType.WithUnderline:
      return (
        <React.Fragment>
          <div className={`button-with-underline ${value.index === 0 ? 'active' : ''}`} datatype={value.to} onClick={value.onPress}>
            <p>{value.text}</p>
            <div className='underline-image' />
          </div>
        </React.Fragment>
      );
    case NavigationButtonType.InBox:
      return (
        <React.Fragment>
          <div className={`button-in-box ${value.index === 0 ? 'active' : ''}`} datatype={value.to} onClick={value.onPress}>
            <p>{value.text}</p>

            <svg width="354" height="53" viewBox="38 38 354 53" fill="none" xmlns="http://www.w3.org/2000/svg" className="background">
              <path d="M40 89H390V52.25L378.5 40H40V89Z" fill="#3051D3" fillOpacity="0.3" stroke="#3051D3" strokeOpacity="0.5" strokeWidth="2" className="path" />
            </svg>
          </div>
        </React.Fragment>
      );
    default:
      return (
        <React.Fragment>
          ОШИБКА
        </React.Fragment>
      );
  }
}

export default NavigationButton;