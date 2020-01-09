// Define PropTypes
import {ScrollView, TouchableOpacity, View, Keyboard, Animated, Image} from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  ListItem,
  Text,
  Icon,
  DatePicker,
  Body,
  Right,
  Switch,
  Picker,
  Item,
  Label,
  Input, List, Card, CardItem, Title,
} from "native-base";

import moment from "moment";
import { Col, Row, Grid } from "react-native-easy-grid";
import * as React from "react";
import IDCard from "../../components/IdCard";
import CheckOutScreen from "./CheckOutScreen";
import { styles } from "./Styles";
import HeaderComponent from "../../components/headerComponent";
import Colors from "../../constants/Colors";
import CardInputComponent from "../../components/CardInputComponent";
import CardPickerComponent from "../../components/CardPickerComponent";
import images from "../../assets/images";

export interface Props {}

// Define States
export interface State {
  isFontLoaded: boolean;
  idcardInfo: IDCardInterface;
  idcardRender: IDCardInterface;
  idcardInfoStatus: IDCardStatusInterface;
  idcardInfoValidation: IDCardStatusInterface;
  states: any;
  uploadPhoto: () => void;
  changeStates: (key: string) => void;
  changeName: (key: string) => void;
  changeBirth: (key: string) => void;
  changeGender: (key: string) => void;
  changeContact1Name: (key: string) => void;
  changeContact1Phone: (key: string) => void;
  changeContact2Name: (key: string) => void;
  changeContact2Phone: (key: string) => void;
  changeMedical: (key: string) => void;
  changeNote: (key: string) => void;
  createKidsId: () => void;
}

export const render = (compRef: CheckOutScreen) => (
  <Container style={styles.container}>
    <HeaderComponent title="Check Out" message back/>
    <Content style={styles.container} disableKBDismissScroll={true}>
      <Form style={{padding: 10}}>
        <Title
          style={{
            fontFamily: "Metropolis-Bold",
            color: Colors.black,
            textAlign: 'left',
            padding: 5,
            marginLeft: 10
          }}>
          Shipping address
        </Title>
        <CardInputComponent label="Full Name">
          <Input
            onChangeText={(text) => compRef.state.changeName(text)}
            maxLength={25}
            placeholder="Enter Full Name"
            placeholderTextColor={Colors.placeholder}
            value={compRef.state.idcardInfo.name}
            style={[
              compRef.state.idcardInfoStatus.name && styles.formText,
              compRef.state.idcardInfoValidation.name &&
              !compRef.state.idcardInfo.name &&
              styles.inValidForm,
              !compRef.state.idcardInfoStatus.name && { color: Colors.inactiveTextColor },
            ]}
            disabled={!compRef.state.idcardInfoStatus.name}
          />
        </CardInputComponent>

        <CardInputComponent label="Address">
          <Input
            placeholder="Enter Address..."
            placeholderTextColor={Colors.placeholder}
            onChangeText={(text) => compRef.state.changeMedical(text)}
            value={compRef.state.idcardInfo.medical}
            style={[
              compRef.state.idcardInfoStatus.medical && styles.formText,
              compRef.state.idcardInfoValidation.medical &&
              !compRef.state.idcardInfo.medical &&
              styles.inValidForm,
              !compRef.state.idcardInfoStatus.medical && { color: Colors.inactiveTextColor },
            ]}
            disabled={!compRef.state.idcardInfoStatus.medical}
          />
        </CardInputComponent>

        <CardInputComponent label="City">
          <Input
            placeholder="Enter City..."
            placeholderTextColor={Colors.placeholder}
            onChangeText={(text) => compRef.state.changeMedical(text)}
            value={compRef.state.idcardInfo.medical}
            style={[
              compRef.state.idcardInfoStatus.medical && styles.formText,
              compRef.state.idcardInfoValidation.medical &&
              !compRef.state.idcardInfo.medical &&
              styles.inValidForm,
              !compRef.state.idcardInfoStatus.medical && { color: Colors.inactiveTextColor },
            ]}
            disabled={!compRef.state.idcardInfoStatus.medical}
          />
        </CardInputComponent>

        <CardPickerComponent label="State/Province/Region">
          <Picker
            mode="dropdown"
            placeholder="Select State"
            placeholderStyle={{ color: Colors.placeholder }}
            style={{
              width: "100%",
              height: 40,
              borderBottomWidth: 0,
              backgroundColor: Colors.itemActive,
            }}
            iosIcon={
              <Icon
                name="arrow-down"
                style={{ fontSize: 25, position: "absolute", right: 0 }}
              />
            }
            selectedValue={
              compRef.state.idcardInfo.state !== ""
                ? compRef.state.idcardInfo.state
                : "Select State"
            }
            onValueChange={(itemValue, itemIndex) =>
              compRef.state.changeStates(itemValue)
            }
            // disabled={compRef.state.idcardInfoStatus.state}
          >
            <Item
              label="Select State"
              value=""
              style={{ width: 100, backgroundColor: Colors.white }}
            />
            {compRef.state.states &&
            compRef.state.states.length &&
            compRef.state.states.map((item, key) => {
              return (
                <Item
                  label={item.name}
                  value={item.name}
                  key={key}
                  style={{ width: 100, backgroundColor: Colors.white }}
                />
              );
            })}
          </Picker>
        </CardPickerComponent>

        <CardInputComponent label="Zip Code(Postal Code)">
          <Input
            placeholder="Enter Zip Code(Postal Code)..."
            placeholderTextColor={Colors.placeholder}
            onChangeText={(text) => compRef.state.changeMedical(text)}
            value={compRef.state.idcardInfo.medical}
            style={[
              compRef.state.idcardInfoStatus.medical && styles.formText,
              compRef.state.idcardInfoValidation.medical &&
              !compRef.state.idcardInfo.medical &&
              styles.inValidForm,
              !compRef.state.idcardInfoStatus.medical && { color: Colors.inactiveTextColor },
            ]}
            disabled={!compRef.state.idcardInfoStatus.medical}
          />
        </CardInputComponent>

        <CardInputComponent label="Country">
          <Input
            placeholder="Enter Country..."
            placeholderTextColor={Colors.placeholder}
            onChangeText={(text) => compRef.state.changeMedical(text)}
            value={compRef.state.idcardInfo.medical}
            style={[
              compRef.state.idcardInfoStatus.medical && styles.formText,
              compRef.state.idcardInfoValidation.medical &&
              !compRef.state.idcardInfo.medical &&
              styles.inValidForm,
              !compRef.state.idcardInfoStatus.medical && { color: Colors.inactiveTextColor },
            ]}
            disabled={!compRef.state.idcardInfoStatus.medical}
          />
        </CardInputComponent>

        <View style={[styles.buttonContainer, { marginBottom: 30 }]}>
          <TouchableOpacity
            style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}
            onPress={compRef.state.createKidsId}
          >
            <Image source={images.submitOrder} style={{width: '85%', resizeMode: 'contain'}}/>
          </TouchableOpacity>
        </View>
      </Form>
    </Content>
  </Container>
);
