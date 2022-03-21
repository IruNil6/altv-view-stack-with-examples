import Color from "../enums/Colors";

interface ColorProps {
  color: Color;
  index?: number;
  isActive?: boolean;
  onPress?: (event: any) => void;
}

export default ColorProps;