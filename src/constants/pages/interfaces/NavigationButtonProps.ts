import NavigationButtonType from "../enums/NavigationButtonType";

interface NavigationButton {
  index?: number;
  text: string;
  type: NavigationButtonType;
  to: string;
  onPress?: (event: any) => void;
}

export default NavigationButton;