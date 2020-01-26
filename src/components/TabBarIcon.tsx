import React from "react";
import {
  Image, View,
} from "react-native";
import Colors from "../constants/Colors";

interface InterfaceProps {
  active: any;
  inactive: any;
  focused: boolean;
}

export default class TabBarIcon extends React.Component<InterfaceProps> {
  public render() {
    return (
      <>
        <Image
          source={this.props.focused ? this.props.active : this.props.inactive}
          style={{height:26,width:26}}
        />
      </>
    );
  }
}
