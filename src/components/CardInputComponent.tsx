import React from "react";
import { Font } from "expo";
// @ts-ignore
import {Body, CardItem, Item, Card, Label} from "native-base";

export default class CardInputComponent extends React.Component {
  render() {
    return (
      <Card>
        <CardItem>
          <Body>
          <Item stackedLabel style={{width: "100%"}}>
            <Label style={{width: "100%", fontSize: 12, paddingLeft: 5, fontFamily: 'Metropolis-Bold', }}>{this.props.label}</Label>
            {this.props.children}
          </Item>
          </Body>
        </CardItem>
      </Card>
    );
  }
}
