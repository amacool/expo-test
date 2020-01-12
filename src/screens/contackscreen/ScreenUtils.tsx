// Define PropTypes
import {TouchableOpacity, View, Image} from "react-native";
import {Container, Content, Form, Icon, Picker, Item, Input, Title} from "native-base";

import * as React from "react";
import ContactScreen from "./ContactScreen";
import { styles } from "./Styles";
import HeaderComponent from "../../components/headerComponent";
import Colors from "../../constants/Colors";
import CardInputComponent from "../../components/CardInputComponent";
import images from "../../assets/images";

export interface Props {}

// Define States
export interface State {
  contactInfo: any;
  contactInfoValidation: any;
  isValid: boolean;
  changeInfo: (key: string, value: string) => void;
  sendMessage: () => void;
}

export const render = (compRef: ContactScreen) => (
  <Container style={styles.container}>
    <HeaderComponent title="Contact Us" back checked={compRef.state.isValid}/>
    <Content style={styles.container} disableKBDismissScroll={true}>
      <Form style={{padding: 10}}>
        <CardInputComponent label="Name">
          <Input
            onChangeText={(text) => compRef.state.changeInfo('name', text)}
            value={compRef.state.contactInfo.name}
            placeholder="Enter Name..."
            placeholderTextColor={Colors.placeholder}
            style={[styles.inValidForm,]}
          />
        </CardInputComponent>

        <CardInputComponent label="Email">
          <Input
            placeholder="Enter Email..."
            placeholderTextColor={Colors.placeholder}
            onChangeText={(text) => compRef.state.changeInfo('email', text)}
            value={compRef.state.contactInfo.email}
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
            onChangeText={(text) => compRef.state.changeInfo('message', text)}
            value={compRef.state.contactInfo.message}
            style={[
              styles.inValidForm,
              styles.multilineInput,
            ]}
          />
        </CardInputComponent>

        <View style={[styles.buttonContainer, { marginBottom: 30 }]}>
          <TouchableOpacity
            style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}
            onPress={compRef.state.sendMessage}
          >
            <Image source={images.sendMessageBtn} style={{width: '85%', resizeMode: 'contain'}}/>
          </TouchableOpacity>
        </View>
      </Form>
    </Content>
  </Container>
);
