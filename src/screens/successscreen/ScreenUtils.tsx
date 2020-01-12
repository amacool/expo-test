// Define PropTypes
import {Image, ScrollView, TouchableOpacity, View} from "react-native";
import {Container, Content, Text, Title} from "native-base";
import * as React from "react";
import SuccessScreen from "./SuccessScreen";
import { styles } from "./Styles";
import images from "../../assets/images";
import Colors from "../../constants/Colors";

export interface Props {}

// Define States
export interface State {
  isFontLoaded: boolean;
  cardIndex: number;
  states: any;
  continueApp: () => void;
}

export const render = (compRef: SuccessScreen) => (
  <Container style={styles.container}>
    <Content>
      <View style={styles.welcomeContainer}>
        <Image source={images.successImg}/>
        <Title style={{
          fontFamily: "Metropolis-Bold",
          color: Colors.black,
          fontSize: 30,
          padding: 5,
        }}
        >
          Success!
        </Title>
        <Title style={{
          fontFamily: "Metropolis-Medium",
          color: Colors.black,
          fontSize: 13,
          padding: 5,
        }}>
          Your order will be delivered soon.
        </Title>
      </View>
      <View style={[styles.buttonContainer, { marginBottom: 30 }]}>
        <TouchableOpacity
          style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}
          onPress={compRef.state.continueApp}
        >
          <Image source={images.submitOrder} style={{width: '85%', resizeMode: 'contain'}}/>
        </TouchableOpacity>
      </View>
    </Content>
  </Container>
);
