import React, {ReactNode} from "react";
import { Font } from "expo";
import {Body, CardItem, Item, Card, Label} from "native-base";
import {View} from "react-native";
import Colors from "../constants/Colors";
interface InterfaceProps {
  label: string;
  children?: ReactNode;
}
export default class CardPickerComponent extends React.Component<InterfaceProps> {
  render() {
    return (
      <Card>
        <CardItem>
          <Body>
          <Item stackedLabel style={{width: "100%"}}>
            <Label style={{width: "100%", fontSize: 12, paddingLeft: 5, fontFamily: 'Metropolis-Thin' }}>{this.props.label}</Label>
            <View
              style={{
                borderBottomWidth: 0.1,
                borderBottomColor: Colors.tabIconDefault,
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
          </Item>
          </Body>
        </CardItem>
      </Card>
    );
  }
}
