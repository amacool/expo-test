import React, {ReactNode} from "react";
import { Font } from "expo";
import {Item, Card, Label} from "native-base";
import {View} from "react-native";
import Colors from "../constants/Colors";
import { widthPercentageToDP as wp} from "../helpers/Responsive";
interface InterfaceProps {
  label: string;
  children?: ReactNode;
}
export default class CardPickerComponent extends React.Component<InterfaceProps> {
  render() {
    return (
      <View style={{
        backgroundColor: 'white',
        borderRadius: 12,
        height: wp('15')
      }}>
        <View style={{width: "100%", alignItems: 'center', paddingLeft: 15, paddingVertical: 13}}>
          <Label style={{width: "100%", fontSize: 12, paddingLeft: 5, fontFamily: 'Metropolis-Thin', zIndex: 2 }}>{this.props.label}</Label>
          <View
            style={{
              marginTop: 0,
              flex: 1,
              width: "100%",
            }}
          >
            <View
              style={{
                flex: 1,
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
