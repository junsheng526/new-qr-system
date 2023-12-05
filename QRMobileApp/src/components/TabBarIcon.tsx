import React from 'react';
import {Image, ImageSourcePropType, StyleSheet} from 'react-native';

type IconProps = {
  size: number;
  color?: string;
  icon: ImageSourcePropType;
};

const TabBarIcon = (props: IconProps) => {
  const {icon, size, color} = props;

  return (
    <Image
      source={icon}
      style={{width: size, height: size, tintColor: color}}
    />
  );
};

export default TabBarIcon;

export const styles = StyleSheet.create({
  // You can define additional styles if needed
});
