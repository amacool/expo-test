// Define PropTypes
import { TouchableOpacity, View } from "react-native";
import { Container, Content, Form, Input, Text } from "native-base";
import { widthPercentageToDP as wp} from "../../helpers/Responsive";
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
    <View style={{ justifyContent: "space-between", flex: 1, height: '100%', paddingHorizontal: '2.5%' }}>
      <View style={{ paddingTop: 10 }}>
        <Form>
          <CardInputComponent label="Name">
            <Input
              onChangeText={(text) => compRef.state.changeInfo('name', text)}
              value={compRef.state.contactInfo.name}
              placeholder="Enter Name..."
              placeholderTextColor={Colors.placeholder}
              style={[styles.formText, { paddingBottom: 20}]}
            />
          </CardInputComponent>

          <CardInputComponent label="Email">
            <Input
              placeholder="Enter Email..."
              placeholderTextColor={Colors.placeholder}
              onChangeText={(text) => compRef.state.changeInfo('email', text)}
              value={compRef.state.contactInfo.email}
              style={[
                styles.formText,
                { paddingBottom: 20}
              ]}
            />
          </CardInputComponent>

          <CardInputComponent label="Your Message">
            <View style={{ 
              maxHeight: 100,
              justifyContent: 'flex-start',
              flexDirection: 'row'
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
                styles.multilineInput,
                {
                  textAlign: 'left',
                  justifyContent: 'flex-start',
                  flexDirection: 'row'
                }
              ]}
            />
            </View>
          </CardInputComponent>
        </Form>
      </View>
      <View style={styles.buttonContainer}>
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
  </Container>
);
