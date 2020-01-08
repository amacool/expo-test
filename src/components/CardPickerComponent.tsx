import React from "react";
import { Font } from "expo";
// @ts-ignore
import {Body, CardItem, Item, Card, Label} from "native-base";
import {View} from "react-native";

export default class CardPickerComponent extends React.Component {
  render() {
    return (
      <Card>
        <CardItem>
          <Body>
          <Item stackedLabel style={{width: "100%"}}>
            <Label style={{width: "100%", fontSize: 12, paddingLeft: 5 }}>{this.props.label}</Label>
            <View
              style={{
                borderBottomWidth: 1,
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
