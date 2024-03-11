import React from 'react';
import {
  TouchableOpacity,
  Text,
  ViewStyle,
  StyleProp,
  TextStyle,
} from 'react-native';

export interface ButtonProps {
  onPress: () => void;
  title: string;
  buttonStyles: StyleProp<ViewStyle>;
  textStyles: StyleProp<TextStyle>;
}

const Button = (props: ButtonProps) => {
  const { onPress, title, buttonStyles, textStyles } = props;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles}>
      <Text style={textStyles}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
