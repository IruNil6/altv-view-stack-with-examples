import React from "react";
import ButtonProps from "./interfaces/ButtonProps";
import ButtonType from "./enums/ButtonType";

import ButtonImage from '../../images/main_button.png';

import './css/button.less';

function Button(value: ButtonProps): JSX.Element {
  switch (value.type) {
    case ButtonType.Main:
      return (
        <div className="main-button-box" onClick={value.onPress}>
          <p className='button-text'>{value.text}</p>

          <img src={'https://i.ibb.co/FVZPFR4/main-button.png'} alt="" className='button-image' width="330" />
        </div>
      )
    case ButtonType.MainBack:
      return (
        <div className="mainBack-button-box" onClick={value.onPress}>
          <p className='button-text'>{value.text}</p>

          <svg width="151" height="39" viewBox="0 0 151 39" fill="none" xmlns="http://www.w3.org/2000/svg" className="background-button">
            <path d="M1 9.38667V38H57.5H120L125 35.04H134L139 38H150V5.93333L145 1H9.5L1 9.38667Z" stroke="#FCF700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )
    case ButtonType.Accept:
      return (
        <div className={`accept-button-box ${value.isActive ? 'active' : ''}`} onClick={value.onPress}>
          <p className='button-text'>{value.text}</p>

          <svg width="155" height="50" viewBox="0 0 155 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="background-button left">
            <path d="M1 9.64286V41.0719L7.47984 49H154V9.99952L146.644 1H1V9.64286Z" stroke="#FCF700" strokeWidth="2" strokeLinecap="square" />
          </svg>
        </div>
      )
    case ButtonType.Cancel:
      return (
        <div className={`cancel-button-box ${value.isActive ? 'active' : ''}`} onClick={value.onPress}>
          <p className='button-text'>{value.text}</p>

          <svg width="155" height="50" viewBox="0 0 155 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="background-button right">
            <path d="M1 9.64286V41.0719L7.47984 49H154V9.99952L146.644 1H1V9.64286Z" stroke="#FCF700" strokeWidth="2" strokeLinecap="square" />
          </svg>
        </div>
      )
    case ButtonType.Back:
      return (
        <div className={`back-button-box ${value.isActive ? 'active' : ''}`} onClick={value.onPress}>
          <p className='button-text'>{value.text}</p>

          <svg width="185" height="50" xmlns="http://www.w3.org/2000/svg" viewBox="20 20 185 50" className="background-button left">
            <path d="M20 28.5714V60.3571V70H195.593L205 60.3571V20H28.3616L20 28.5714Z" />
          </svg>
        </div>
      )
    case ButtonType.Next:
      return (
        <div className={`next-button-box ${value.isActive ? 'active' : ''}`} onClick={value.onPress}>
          <p className='button-text'>{value.text}</p>

          <svg width="185" height="50" xmlns="http://www.w3.org/2000/svg" viewBox="20 20 185 50" className="background-button">
            <path d="M20 28.5714V60.3571V70H195.593L205 60.3571V20H28.3616L20 28.5714Z" />
          </svg>
        </div>
      )
    default:
      return (
        <div className="error">ОШИБКА В КНОПКЕ</div>
      )
  }
}

export default Button;