import EditorBoxType from "../enums/EditorBoxType";
import ColorProps from "./ColorProps";
import ImageProps from "./ImageProps";
import NumberProps from "./NumberProps";
import RangeInputProps from "./RangeInputProps";

interface EditorBoxProps {
  title: string;
  subTitle?: string;
  content?: ImageProps[] | NumberProps[] | RangeInputProps[];
  colors?: ColorProps[];
  type: EditorBoxType;
  id: string;
  key?: number;
  onPress: (event: any) => void;
}

export default EditorBoxProps;