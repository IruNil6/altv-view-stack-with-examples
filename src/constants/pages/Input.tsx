import React from 'react';

import InputProps from './interfaces/InputProps';
import InputType from './enums/InputType';

import ShowPassword from '../../images/eye.png';
import HidePassword from '../../images/eye-slash.png';
import EmailIcon from '../../images/email_icon.png';
import PasswordIcon from '../../images/password_icon.png';
import LoginIcon from '../../images/login_icon.png';

import './css/input.less';

class Input extends React.Component<InputProps, any> {
  constructor(props: InputProps) {
    super(props);
  }

  private ChangeView(event: any): void {
    const input = event.target.parentElement.querySelector('input') as HTMLElement;
    const image = event.target as HTMLElement;

    input.getAttribute('type') === 'password' ? input.setAttribute('type', 'text') : input.setAttribute('type', 'password');
    input.getAttribute('type') === 'password' ? image.setAttribute('src', 'https://i.ibb.co/2PQmJLJ/eye.png') : image.setAttribute('src', 'https://i.ibb.co/9TzXk84/eye-slash.png');
  }

  render() {
    let icon = '';
    switch (this.props.type) {
      case InputType.Login:
        icon = 'https://i.ibb.co/smBhmMS/login-icon.png';
        break;
      case InputType.Email:
        icon = 'https://i.ibb.co/VwhQ1Lw/email-icon.png';
        break;
      case InputType.ConfirmationCode:
      case InputType.Password:
        icon = 'https://i.ibb.co/HpTpFqJ/password-icon.png';
        break;
      default:
        break;
    }

    return (
      <React.Fragment>
        <div className="input-box">
          <div className="input-container">
            {this.props.type === InputType.Text ? <></> :
              <div className="image-container">
                <img src={icon} alt="" className="input-icon" width="35" height="35  " />
              </div>
            }
            <input
              type={this.props.type === InputType.Login || this.props.type === InputType.ConfirmationCode ? InputType.Text : this.props.type}
              id={`${this.props.type}-${this.props.index}-id`}
              className={`${this.props.type} ${this.props.inputText !== undefined ? 'active' : ''}`}
              defaultValue={this.props.inputText}
              onChange={this.props.onChangeInput}
              pattern={this.props.pattern} />
            <label htmlFor={`${this.props.type}-${this.props.index}-id`}>{this.props.labelText}</label>
            {this.props.type === InputType.Password ?
              <img src={'https://i.ibb.co/2PQmJLJ/eye.png'} alt="" onClick={this.ChangeView.bind(this)} className="show-hide-password" />
              :
              <></>
            }
          </div>

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="22 22 330 8" className="underline">
            <path d="M 22 26.2667 L 28.5099 22 L 35.0197 26.2667 H 47.5387 L 51.044 23.6 L 55.0501 26.2667 H 102.622 L 106.127 30 H 114.64 L 117.144 27.3333 H 123.153 L 124.155 26.2667 H 195 M 194.261 26.2667 H 206.78 L 210.285 28.4 L 214.291 25.7333 H 261.863 L 265.369 22 H 273.882 L 276.385 24.6667 H 282.395 L 283.396 25.7333 H 352" stroke="#FFFFFF" strokeWidth="2" fill="none" className="path" />
          </svg>

          <p className="error-message" id={`${this.props.type}-${this.props.index}-error`}></p>
        </div>
      </React.Fragment>
    );
  }
}

export default Input;