// Define PropTypes
import {ScrollView, TouchableOpacity, View, Keyboard, Animated, Image} from "react-native";
import {
  Container,
  Content,
  Form,
  Icon,
  DatePicker,
  Picker,
  Item,
  Input
} from "native-base";

import * as React from "react";
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
  uploadPhoto: () => void;
  changeInfo: (key: string, value: string) => void;
  changeContactInfo: (key: string, value: string) => void;
  createKidsId: () => void;
}

export const render = (compRef: IDCreateScreen) => (
  <Container style={styles.container}>
    <HeaderComponent title="Create ID" message back/>
    <Content style={styles.container} disableKBDismissScroll={true}>
      <View style={styles.welcomeContainer}>
        <IDCard ref={(ref) => (compRef.imageRef = ref)} {...compRef.state.idcardRender} />
      </View>
      <View style={[styles.buttonContainer, { marginBottom: 30 }]}>
        <TouchableOpacity
          style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}
          onPress={compRef.state.uploadPhoto}
        >
          <Image source={images.uploadPhotoBtn} style={{width: '85%', resizeMode: 'contain'}}/>
        </TouchableOpacity>
      </View>
      {/*<View style={styles.buttonContainer}>*/}
      {/*<TouchableOpacity onPress={compRef._handleHelpPress} style={styles.problemBotton}>*/}
      {/*<Text style={[styles.problemText]}>PROBLEM UPLOADING?</Text>*/}
      {/*</TouchableOpacity>*/}
      {/*</View>*/}
      <Form style={{padding: 10}}>
        <CardInputComponent label="Name">
          <Input
            onChangeText={(text) => compRef.state.changeInfo('name', text)}
            maxLength={25}
            placeholder="Enter Name"
            placeholderTextColor={Colors.placeholder}
            value={compRef.state.idcardInfo.name}
            style={[
              styles.formText,
              compRef.state.idcardInfoValidation.name &&
              !compRef.state.idcardInfo.name && styles.inValidForm,
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
            textStyle={{fontFamily: 'Metropolis-Thin'}}
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
              styles.formText,
              compRef.state.idcardInfoValidation.breed &&
              !compRef.state.idcardInfo.breed && styles.inValidForm,
            ]}
          />
        </CardInputComponent>

        <CardPickerComponent label="Gender">
          <Picker
            mode="dropdown"
            placeholder="Select Gender"
            placeholderStyle={{ color: Colors.placeholder, fontFamily: 'Metropolis-Thin' }}
            style={[
              styles.formText,
              { height: 40, borderBottomWidth: 0, backgroundColor: Colors.itemActive },
            ]}
            iosIcon={
              <Icon
                name="arrow-down"
                style={{ fontSize: 25, position: "absolute", right: 0 }}
              />
            }
            textStyle={{fontFamily: 'Metropolis-Thin'}}
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
              style={{ width: 100, backgroundColor: Colors.white }}
            />
            <Item
              label="Female"
              value="female"
              style={{ width: 100, backgroundColor: Colors.white }}
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
              styles.formText,
              compRef.state.idcardInfoValidation.color &&
              !compRef.state.idcardInfo.color &&
              styles.inValidForm,
            ]}
          />
        </CardInputComponent>

        <CardInputComponent label="Contact">
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
              styles.formText,
              compRef.state.idcardInfoValidation.contact &&
              !compRef.state.idcardInfo.contact &&
              styles.inValidForm,
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
              compRef.state.changeInfo('state', itemValue)
            }
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

        <CardInputComponent label="Country">
          <Input
            placeholder="Enter Country..."
            placeholderTextColor={Colors.placeholder}
            onChangeText={(text) => compRef.state.changeInfo('country', text)}
            value={compRef.state.idcardInfo.country}
            style={[
              styles.formText,
              compRef.state.idcardInfoValidation.country &&
              !compRef.state.idcardInfo.country &&
              styles.inValidForm,
            ]}
          />
        </CardInputComponent>

        <CardInputComponent label="Note">
          <Input
            onChangeText={(text) => compRef.state.changeInfo('note', text)}
            value={compRef.state.idcardInfo.note}
            placeholder="Enter Note..."
            placeholderTextColor={Colors.placeholder}
            style={[
              styles.formText,
              compRef.state.idcardInfoValidation.note &&
              !compRef.state.idcardInfo.note &&
              styles.inValidForm,
            ]}
          />
        </CardInputComponent>
        <View style={[styles.buttonContainer, { marginBottom: 30 }]}>
          <TouchableOpacity
            style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}
            onPress={compRef.state.createKidsId}
          >
            <Image source={images.saveIdBtn} style={{width: '85%', resizeMode: 'contain'}}/>
          </TouchableOpacity>
        </View>
      </Form>
    </Content>
  </Container>
);
