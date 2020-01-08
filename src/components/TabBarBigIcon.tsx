import React from "react";
// @ts-ignore
import { Icon } from "expo";
import {
  Image,
} from "react-native";
import Colors from "../constants/Colors";

interface InterfaceProps {
  active: any;
  inactive: any;
  focused: boolean;
}

export default class TabBarBigIcon extends React.Component<InterfaceProps> {
  public render() {
    return (
      <Image
        source={this.props.focused ? this.props.active : this.props.inactive}
        style={{height:35,width:50, resizeMode: 'contain'}}
      />
    );
  }
}
