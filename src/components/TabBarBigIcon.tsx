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

export default class TabBarBigIcon extends React.Component<InterfaceProps> {
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
          style={{height:35,width:50, resizeMode: 'contain'}}
        />
      </>

    );
  }
}
