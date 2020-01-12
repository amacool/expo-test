import React from "react";
import {
  TouchableOpacity,
  Image, StyleSheet, ViewStyle, TextStyle, ImageStyle,
} from "react-native";
import images from "../assets/images";

interface InterfaceProps {
  focused: boolean;
}
interface InterfaceStyle {
  [key: string]: ViewStyle | TextStyle | ImageStyle;
}

export default class TabBarFloatIcon extends React.Component<InterfaceProps> {
  public render() {
    return (
      <TouchableOpacity style={styles.buttonContain}>
        <Image
          source={images.tabCreateNew}
          style={styles.addImage}
        />
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create<InterfaceStyle>({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  buttonContain: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    top: -25,
    zIndex: 1000,
  },
  addImage: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
  },
});
