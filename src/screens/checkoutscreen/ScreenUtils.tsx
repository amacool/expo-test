import {TouchableOpacity, View, Image} from "react-native";
import {
  Container,
  Content,
  Form,
  Icon,
  Picker,
  Item,
  Input,
  Title,
} from "native-base";

import * as React from "react";
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
  checkOutInfo: CheckOutModel;
  checkOutInfoValidation: CheckOutStatusModel;
  states: any;
  countries: any,
  isValid: boolean,
  allCountryData: any,
  checkOut: () => void;
  changeCountry: (value: any, index: number) => void;
  changeInfo: (key: string, value: string) => void;
}

export const render = (compRef: CheckOutScreen) => (
  <Container style={styles.container}>
    <HeaderComponent title="Check Out" message back checked={compRef.state.isValid}/>
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
            onChangeText={(text) => compRef.state.changeInfo('name', text)}
            maxLength={25}
            placeholder="Enter Full Name"
            placeholderTextColor={Colors.placeholder}
            value={compRef.state.checkOutInfo.name}
            style={[
              styles.formText,
              compRef.state.checkOutInfoValidation.name &&
              !compRef.state.checkOutInfo.name && styles.inValidForm,
            ]}
          />
        </CardInputComponent>

        <CardInputComponent label="Address">
          <Input
            onChangeText={(text) => compRef.state.changeInfo('address', text)}
            maxLength={25}
            placeholder="Enter Address"
            placeholderTextColor={Colors.placeholder}
            value={compRef.state.checkOutInfo.address}
            style={[
              styles.formText,
              compRef.state.checkOutInfoValidation.address &&
              !compRef.state.checkOutInfo.address && styles.inValidForm,
            ]}
          />
        </CardInputComponent>

        <CardInputComponent label="City">
          <Input
            onChangeText={(text) => compRef.state.changeInfo('city', text)}
            maxLength={25}
            placeholder="Enter City"
            placeholderTextColor={Colors.placeholder}
            value={compRef.state.checkOutInfo.city}
            style={[
              styles.formText,
              compRef.state.checkOutInfoValidation.city &&
              !compRef.state.checkOutInfo.city && styles.inValidForm,
            ]}
          />
        </CardInputComponent>

        <CardInputComponent label="State/Province/Region">
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
            itemStyle={{ color: Colors.placeholder, fontFamily:"Metropolis-Thin" }}
            iosIcon={
              <Icon
                name="arrow-down"
                style={{ fontSize: 25, position: "absolute", right: 0 }}
              />
            }
            selectedValue={
              compRef.state.checkOutInfo.state !== ""
                ? compRef.state.checkOutInfo.state
                : "Select State"
            }
            onValueChange={(itemValue, itemIndex) =>
              compRef.state.changeInfo('state', itemValue)
            }
          >
            <Item
              label="Select State"
              value=""
              color={Colors.placeholder}
              style={{ width: 100, backgroundColor: Colors.white }}
            />
            {compRef.state.states &&
            compRef.state.states.map((item, key) => {
              return (
                <Item
                  color={Colors.activeTextColor}
                  label={item.name}
                  value={item.name}
                  key={key}
                  style={{ width: 100, backgroundColor: Colors.white }}
                />
              );
            })}
          </Picker>
        </CardInputComponent>

        <CardInputComponent label="Zip Code(Postal Code)">
          <Input
            onChangeText={(text) => compRef.state.changeInfo('zipcode', text)}
            maxLength={25}
            placeholder="Enter Zip Code"
            placeholderTextColor={Colors.placeholder}
            value={compRef.state.checkOutInfo.zipcode}
            style={[
              styles.formText,
              compRef.state.checkOutInfoValidation.zipcode &&
              !compRef.state.checkOutInfo.zipcode && styles.inValidForm,
            ]}
          />
        </CardInputComponent>

        <CardPickerComponent label="Country">
          <Picker
            mode="dropdown"
            placeholder="Select Country"
            placeholderStyle={{ color: Colors.placeholder }}
            style={{
              width: "100%",
              height: 40,
              borderBottomWidth: 0,
              color: Colors.activeTextColor,
              backgroundColor: Colors.itemActive,
            }}
            itemStyle={{ color: Colors.placeholder, fontFamily:"Metropolis-Thin" }}
            iosIcon={
              <Icon
                name="arrow-down"
                style={{ fontSize: 25, position: "absolute", right: 0 }}
              />
            }
            selectedValue={
              compRef.state.checkOutInfo.country !== ""
                ? compRef.state.checkOutInfo.country
                : "Select State"
            }
            onValueChange={(itemValue, itemIndex) =>
              compRef.state.changeCountry(itemValue, itemIndex)
            }
          >
            {compRef.state.countries &&
            compRef.state.countries.length &&
            compRef.state.countries.map((item, key) => {
              return (
                <Item
                  color={Colors.activeTextColor}
                  label={item.name}
                  value={item.name}
                  key={key}
                  style={{ width: 100, backgroundColor: Colors.white }}
                />
              );
            })}
          </Picker>
        </CardPickerComponent>

        <View style={[styles.buttonContainer, { marginBottom: 30 }]}>
          <TouchableOpacity
            style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}
            onPress={compRef.state.checkOut}
          >
            <Image source={images.submitOrder} style={{width: '85%', resizeMode: 'contain'}}/>
          </TouchableOpacity>
        </View>
      </Form>
    </Content>
  </Container>
);
