import React, {ReactNode} from "react";
import { Font } from "expo";
import {View, Item, Label} from "native-base";
import { widthPercentageToDP as wp} from "../helpers/Responsive";

interface InterfaceProps {
  label: string;
  children?: ReactNode;
}

export default class CardInputComponent extends React.Component<InterfaceProps> {
  render() {
    return (
      <View style={{
        backgroundColor: 'white',
        borderRadius: 12,
        marginVertical: 6,
        paddingHorizontal: wp('3'),
        paddingVertical: wp('3.8'),
        height: wp('17')
      }}>
          <View style={{width: "100%", alignItems: 'center', height: '100%'}}>
            <Label style={{width: "100%", fontSize: 12, paddingLeft: 5, fontFamily: 'Metropolis-Thin'}}>{this.props.label}</Label>
            {this.props.children}
          </View>
       </View>
    );
  }
}
