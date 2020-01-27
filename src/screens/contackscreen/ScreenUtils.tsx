// Define PropTypes
import { TouchableOpacity, View } from "react-native";
import { Container, Content, Form, Input, Text } from "native-base";

import * as React from "react";
import ContactScreen from "./ContactScreen";
import { styles } from "./Styles";
import HeaderComponent from "../../components/headerComponent";
import Colors from "../../constants/Colors";
import CardInputComponent from "../../components/CardInputComponent";

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
    <Form>
      <View style={{ justifyContent: "space-between", height: '86%', paddingHorizontal: '2.5%' }}>
        <View style={{ paddingTop: 10 }}>
          <CardInputComponent label="Name">
            <Input
              onChangeText={(text) => compRef.state.changeInfo('name', text)}
              value={compRef.state.contactInfo.name}
              placeholder="Enter Name..."
              placeholderTextColor={Colors.placeholder}
              style={styles.formText}
            />
          </CardInputComponent>

          <CardInputComponent label="Email">
            <Input
              placeholder="Enter Email..."
              placeholderTextColor={Colors.placeholder}
              onChangeText={(text) => compRef.state.changeInfo('email', text)}
              value={compRef.state.contactInfo.email}
              style={[
                styles.formText
              ]}
            />
          </CardInputComponent>

          <CardInputComponent label="Your Message">
            <View style={{ 
              maxHeight: 100
            }}>
            <Input
              placeholder="Enter Message..."
              multiline
              placeholderTextColor={Colors.placeholder}
              numberOfLines={4}
              onChangeText={(text) => compRef.state.changeInfo('message', text)}
              value={compRef.state.contactInfo.message}
              style={[
                styles.formText,
                styles.multilineInput
              ]}
            />
            </View>
          </CardInputComponent>
        </View>
        <View style={[styles.buttonContainer, { marginTop: 30 }]}>
          <TouchableOpacity
            style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}
            onPress={compRef.state.sendMessage}
          >
            <Text style={styles.btnSendMsg}>
              Send Message
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Form>
  </Container>
);
