import InputType from '../enums/InputType';

interface InputProps {
  labelText: string;
  type: InputType;
  isPassword?: boolean;
  icon?: string;
  inputText?: string;
  index?: number;
  pattern?: string;
  onChangeInput?: (event: any) => void;
}

export default InputProps;