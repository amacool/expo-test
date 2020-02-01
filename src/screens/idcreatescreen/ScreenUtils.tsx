// Define PropTypes
import { TouchableOpacity, View, Image, Platform } from "react-native";
import {
  Container,
  Content,
  Form,
  Icon,
  DatePicker,
  Picker,
  Item,
  Input,
  Text
} from "native-base";

import * as React from "react";
import { widthPercentageToDP as wp} from "../../helpers/Responsive";
import IDCard from "../../components/IdCard";
import IDCreateScreen from "./IDCreateScreen";
import { styles } from "./Styles";
import HeaderComponent from "../../components/headerComponent";
import Colors from "../../constants/Colors";
import CardInputComponent from "../../components/CardInputComponent";
import CardPickerComponent from "../../components/CardPickerComponent";
import images from "../../assets/images";

export interface Props {}

// Define States
export interface State {
  idcardInfo: IDCardInterface;
  idcardRender: IDCardInterface;
  idcardInfoValidation: IDCardStatusInterface;
  scrollPos: number;
  states: any;
  countries: any,
  isValid: boolean,
  allCountryData: any,
  uploadPhoto: () => void;
  changeInfo: (key: string, value: string) => void;
  changeCountry: (value: any, index: number) => void;
  changeContactInfo: (key: string, value: string) => void;
  createKidsId: () => void;
}
const isIos = Platform.OS === "ios";

export const render = (compRef: IDCreateScreen) => (
  <Container style={styles.container}>
    <HeaderComponent title="Create ID" message back checked={compRef.state.isValid}/>
    <Content disableKBDismissScroll={true}>
      <View style={styles.welcomeContainer}>
        <IDCard ref={(ref) => (compRef.imageRef = ref)} {...compRef.state.idcardRender} />
      </View>
      <View style={[styles.buttonContainer, { marginTop: 30 }]}>
        <TouchableOpacity
          style={styles.uploadPhotoButtonStyle}
          onPress={compRef.state.uploadPhoto}
        >
          <Text style={styles.uploadPhotoText}>Upload Photo</Text>
          <Image 
            style={styles.uplaodPhotoBtnStyle}
            source={images.uploadPhotoBtn}
          />
        </TouchableOpacity>
      </View>
      <View style={[styles.buttonContainer, { marginTop: 10 }]}>
        <TouchableOpacity onPress={compRef._handleHelpPress}>
          <Text style={styles.problemText}>Problem Uploading?</Text>
        </TouchableOpacity>
      </View>
      <Form style={{padding: wp(4)}}>
        <CardInputComponent label="Name">
          <Input
            onChangeText={(text) => compRef.state.changeInfo('name', text)}
            maxLength={25}
            placeholder="Enter Name"
            placeholderTextColor={Colors.placeholder}
            value={compRef.state.idcardInfo.name}
            style={[
              styles.formText
            ]}
          />
        </CardInputComponent>

        <CardPickerComponent label="Date of Birth">
          <DatePicker
            defaultDate={compRef.state.idcardInfo.birthday}
            minimumDate={new Date(2008, 1, 1)}
            maximumDate={new Date(2028, 12, 31)}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            textStyle={{fontFamily: 'sf-regular', color: Colors.black}}
            onDateChange={(date) => compRef.state.changeInfo('birthday', date)}
          />
        </CardPickerComponent>

        <CardInputComponent label="Breed">
          <Input
            placeholder="Enter Breed..."
            placeholderTextColor={Colors.placeholder}
            onChangeText={(text) => compRef.state.changeInfo('breed', text)}
            value={compRef.state.idcardInfo.breed}
            style={[
              styles.formText
            ]}
          />
        </CardInputComponent>

        <CardPickerComponent label="Gender">
          <Picker
            mode="dropdown"
            placeholder="Select Gender"
            placeholderStyle={{ color: Colors.placeholder, fontFamily: 'Metropolis-Medium' }}
            style={{
              width: "100%",
              height: 40,
              borderBottomWidth: 0,
              position: 'relative',
              backgroundColor: 'white',
              borderTopWidth: 0,
              paddingLeft: 0,
              marginLeft: isIos ? -10 : 0
            }}
            itemStyle={{ color: Colors.placeholder, fontFamily:"Metropolis-Medium" }}
            iosIcon={
              <Icon
                name="arrow-down"
                style={{ fontSize: 25, position: "absolute", right: 0, invisible: false }}
              />
            }
            textStyle={{fontFamily: 'Metropolis-Medium'}}
            selectedValue={
              compRef.state.idcardInfo.gender !== ""
                ? compRef.state.idcardInfo.gender
                : "Select Gender"
            }
            onValueChange={(itemValue) =>
              compRef.state.changeInfo('gender', itemValue)
            }
          >
            <Item
              label="Male"
              value="male"
              color={Colors.activeTextColor}
              style={{ width: 100, backgroundColor: Colors.white, borderBottomWidth: 0 }}
            />
            <Item
              label="Female"
              value="female"
              color={Colors.activeTextColor}
              style={{ width: 100, backgroundColor: Colors.white, borderBottomWidth: 0 }}
            />
          </Picker>
        </CardPickerComponent>

        <CardInputComponent label="Fur Color">
          <Input
            placeholder="Enter Fur Color..."
            placeholderTextColor={Colors.placeholder}
            onChangeText={(text) => compRef.state.changeInfo('color', text)}
            value={compRef.state.idcardInfo.color}
            style={[
              styles.formText
            ]}
          />
        </CardInputComponent>

        <CardInputComponent label="Contact">
          <Text style={{ color: Colors.mainColor, alignSelf: 'flex-end', marginTop: -20 }}>+ Add another</Text>
          <Input
            placeholder="555 555 5555"
            placeholderTextColor={Colors.placeholder}
            onChangeText={(text) => compRef.state.changeContactInfo('contact', text)}
            keyboardType="phone-pad"
            returnKeyType="done"
            maxLength={12}
            value={
              compRef.state.idcardInfo.contact
            }
            style={[
              styles.formText
            ]}
          />
        </CardInputComponent>

        <CardInputComponent label="Address">
          <Input
            placeholder="Enter Address..."
            placeholderTextColor={Colors.placeholder}
            onChangeText={(text) => compRef.state.changeInfo('address', text)}
            value={compRef.state.idcardInfo.address}
            style={[
              styles.formText,
              compRef.state.idcardInfoValidation.address &&
              !compRef.state.idcardInfo.address &&
              styles.inValidForm,
            ]}
          />
        </CardInputComponent>

        <CardInputComponent label="City">
          <Input
            placeholder="Enter City..."
            placeholderTextColor={Colors.placeholder}
            onChangeText={(text) => compRef.state.changeInfo('city', text)}
            value={compRef.state.idcardInfo.city}
            style={[
              styles.formText,
              compRef.state.idcardInfoValidation.city &&
              !compRef.state.idcardInfo.city &&
              styles.inValidForm,
            ]}
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
              backgroundColor: 'white',
              paddingLeft: 0,
              marginLeft: 0
            }}
            itemStyle={{ color: Colors.placeholder, fontFamily:"Metropolis-Medium" }}
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
              compRef.state.changeInfo('state', itemValue)
            }
          >
            <Item
              label="Select State"
              value=""
              // color={Colors.placeholder}
              style={{ width: 100, backgroundColor: Colors.white }}
            />
            {compRef.state.states &&
            compRef.state.states.map((item, key) => {
              return (
                <Item
                  // color={Colors.activeTextColor}
                  label={item.name}
                  value={item.name}
                  key={key}
                  style={{ width: 100, backgroundColor: Colors.white }}
                />
              );
            })}
          </Picker>
        </CardPickerComponent>

        <CardInputComponent label="Zip Code (Postal Code)">
          <Input
            placeholder="Enter ZipCode..."
            placeholderTextColor={Colors.placeholder}
            onChangeText={(text) => compRef.state.changeInfo('zipcode', text)}
            value={compRef.state.idcardInfo.zipcode}
            style={[
              styles.formText,
              compRef.state.idcardInfoValidation.zipcode &&
              !compRef.state.idcardInfo.zipcode &&
              styles.inValidForm,
            ]}
          />
        </CardInputComponent>

        <CardInputComponent label="Notes">
          <Input
            onChangeText={(text) => compRef.state.changeInfo('note', text)}
            value={compRef.state.idcardInfo.note}
            placeholder="Enter Note..."
            placeholderTextColor={Colors.placeholder}
            style={[
              styles.formText
            ]}
          />
        </CardInputComponent>
        <View style={[styles.buttonContainer, { marginBottom: wp(17) }]}>
          <TouchableOpacity
            style={[styles.uploadPhotoButtonStyle, styles.btnSave]}
            onPress={compRef.state.createKidsId}
          >
            <Text style={styles.uploadPhotoText}>Save</Text>
          </TouchableOpacity>
        </View>
      </Form>
    </Content>
  </Container>
);
