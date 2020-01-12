// Define PropTypes
import {TouchableOpacity, View, Image} from "react-native";
import {Container, Content, Form, Input} from "native-base";

import * as React from "react";
import ViewIdScreen from "./ViewIdScreen";
import { styles } from "./Styles";
import HeaderComponent from "../../components/headerComponent";
import Colors from "../../constants/Colors";
import CardInputComponent from "../../components/CardInputComponent";
import images from "../../assets/images";

export interface Props {}

// Define States
export interface State {
}

export const render = (compRef: ViewIdScreen) => (
  <Container style={styles.container}>
    <HeaderComponent title="Contact Us" message back/>
    <Content style={styles.container} disableKBDismissScroll={true}>
      <Form style={{padding: 10}}>
        <CardInputComponent label="Name">
          <Input
            placeholder="Enter Name..."
            placeholderTextColor={Colors.placeholder}
            style={[styles.inValidForm,]}
          />
        </CardInputComponent>

        <CardInputComponent label="Email">
          <Input
            placeholder="Enter Email..."
            placeholderTextColor={Colors.placeholder}
            style={[
              styles.inValidForm,
            ]}
          />
        </CardInputComponent>

        <CardInputComponent label="Your Message">
          <Input
            placeholder="Enter Message..."
            multiline
            placeholderTextColor={Colors.placeholder}
            numberOfLines={4}
            style={[
              styles.inValidForm,
              styles.multilineInput,
            ]}
          />
        </CardInputComponent>

        <View style={[styles.buttonContainer, { marginBottom: 30 }]}>
          <TouchableOpacity
            style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}
          >
            <Image source={images.sendMessageBtn} style={{width: '85%', resizeMode: 'contain'}}/>
          </TouchableOpacity>
        </View>
      </Form>
    </Content>
  </Container>
);
