import React from "react";
// @ts-ignore
import { Icon } from "expo";
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
        {this.props.focused && <View style={{
          position: 'absolute',
          top: -10,
          backgroundColor: Colors.tintColor,
          width: 6,
          height: 6,
          borderRadius: 3,
        }}/>}
        <Image
          source={this.props.focused ? this.props.active : this.props.inactive}
          style={{height:26,width:26}}
        />
      </>
    );
  }
}
