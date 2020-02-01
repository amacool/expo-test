import React, {ReactNode} from "react";
import { Font } from "expo";
import { Platform } from "react-native";
import {Item, Card, Label} from "native-base";
import {View} from "react-native";
import Colors from "../constants/Colors";
import { widthPercentageToDP as wp} from "../helpers/Responsive";
interface InterfaceProps {
  label: string;
  children?: ReactNode;
}
const isIos = Platform.OS === "ios";
export default class CardPickerComponent extends React.Component<InterfaceProps> {
  render() {
    return (
      <View style={{
        backgroundColor: 'white',
        borderRadius: 12,
        height: wp('17')
      }}>
        <View style={{width: "100%", alignItems: 'center', paddingLeft: 15, paddingVertical: 13}}>
          <Label style={{width: "100%", fontSize: 12, paddingLeft: 5, fontFamily: 'Metropolis-Thin', zIndex: 2 }}>{this.props.label}</Label>
          <View
            style={{
              marginTop: isIos ? wp('-1') : wp(0),
              width: "100%",
              marginLeft: -5
            }}
          >
            <View
              style={{
                borderRadius: 10,
              }}
            >
              {this.props.children}
            </View>
          </View>
        </View>
      </View>
    );
  }
}
