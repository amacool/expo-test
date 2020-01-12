import React, {ReactNode} from "react";
import { Font } from "expo";
import {Body, CardItem, Item, Card, Label} from "native-base";
interface InterfaceProps {
  label: string;
  children?: ReactNode;
}
export default class CardInputComponent extends React.Component<InterfaceProps> {
  render() {
    return (
      <Card>
        <CardItem>
          <Body>
          <Item stackedLabel style={{width: "100%"}}>
            <Label style={{width: "100%", fontSize: 12, paddingLeft: 5, fontFamily: 'Metropolis-Thin'}}>{this.props.label}</Label>
            {this.props.children}
          </Item>
          </Body>
        </CardItem>
      </Card>
    );
  }
}
