import React from "react";
import { Image, View } from "react-native";
import Colors from "../constants/Colors";

interface InterfaceProps {
  active: any;
  inactive: any;
  focused: boolean;
}

export default class TabBarBigIcon extends React.Component<InterfaceProps> {
  public render() {
    return (
      <>
        <Image
          source={this.props.focused ? this.props.active : this.props.inactive}
          style={{ height: 58, width:58, resizeMode: 'contain'}}
          // style={{ height: 58,width:58, resizeMode: 'contain', top: -45, zIndex: 50, position: 'absolute' }}
        />
      </>
    );
  }
}
