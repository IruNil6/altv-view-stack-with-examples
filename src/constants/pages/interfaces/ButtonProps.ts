import ButtonType from "../enums/ButtonType";

interface ButtonProps {
  text: string;
  index?: number;
  type: ButtonType;
  isActive?: boolean;
  onPress?: (event: any) => void;
}

export default ButtonProps;