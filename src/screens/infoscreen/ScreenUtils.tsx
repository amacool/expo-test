// Define PropTypes
import {Image, ScrollView, TouchableOpacity, View} from "react-native";
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
  Input,
} from "native-base";
import moment from "moment";
import { Col, Row, Grid } from "react-native-easy-grid";
import * as React from "react";
import MissingCard from "../../components/MissingCard";
import MissingScreen from "./InfoScreen";
import { styles } from "./Styles";
import HeaderTabComponent from "../../components/headerTabComponent";
import Colors from "../../constants/Colors";
import { widthPercentageToDP as wp } from "../../helpers/Responsive";
import HeaderComponent from "../../components/headerComponent";
import images from "../../assets/images";
import CardInputComponent from "../../components/CardInputComponent";
import CardPickerComponent from "../../components/CardPickerComponent";

export interface Props {}

// Define States
export interface State {
  isFontLoaded: boolean;
  idcardInfo: MessingCardInterface;
  idcardRender: MessingCardInterface;
  idcardInfoStatus: MissingCardStatusInterface;
  idcardInfoValidation: MissingCardStatusInterface;
  states: any;
  heights: any;
  eyescolors: any;
  haircolors: any;
  weight: any;
  chooseExistingID: () => void;
  uploadPhoto: () => void;
  changeStates: (key: string) => void;
  changeName: (key: string) => void;
  changeStateName: (key: string) => void;
  changeCityName: (key: string) => void;
  changeBirth: (key: string) => void;
  changeGender: (key: string) => void;
  changeWeight: (key: string) => void;
  changeHeight: (key: string) => void;
  changeHairColor: (key: string) => void;
  changeEyesColor: (key: string) => void;
  changeMissingDate: (key: string) => void;
  changeMedical: (key: string) => void;
  changeNote: (key: string) => void;
  changeContact1: (key: string) => void;
  changeContact2: (key: string) => void;
  createKidsId: () => void;
}

export const render = (compRef: MissingScreen) => (
  <Container style={styles.container}>
    <HeaderComponent title={"Report Missing"} message back/>
    <Content style={styles.container} disableKBDismissScroll={true}>
      <View style={styles.welcomeContainer}>
        <MissingCard ref={(ref) => (compRef.imageRef = ref)} {...compRef.state.idcardRender} />
      </View>

      <View style={[styles.buttonContainer, { marginBottom: 30 }]}>
        <TouchableOpacity
          style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}
          onPress={compRef.state.chooseExistingID}
        >
          <Image source={images.useExistingBtn} style={{width: '85%', resizeMode: 'contain'}}/>
        </TouchableOpacity>
      </View>
      {compRef.state.isIDSelected && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.problemBotton}>
            <Text style={[styles.problemText]}>OR FILL THE FORM BELOW</Text>
          </TouchableOpacity>
        </View>
      )}
      {compRef.state.isIDSelected && (
        <View style={[styles.buttonContainer, { marginBottom: 30 }]}>
          <TouchableOpacity
            style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}
            onPress={compRef.state.uploadPhoto}
          >
            <Image source={images.uploadPhotoBtn} style={{width: '85%', resizeMode: 'contain'}}/>
          </TouchableOpacity>
        </View>
      )}
      {/*<View style={styles.buttonContainer}>*/}
      {/*<TouchableOpacity onPress={compRef._handleHelpPress} style={styles.problemBotton}>*/}
      {/*<Text style={[styles.problemText]}>PROBLEM UPLOADING?</Text>*/}
      {/*</TouchableOpacity>*/}
      {/*</View>*/}
      {compRef.state.isIDSelected && (
        <Form>
          <CardInputComponent label="Name">
            <Input
              onChangeText={(text) => compRef.state.changeName(text)}
              maxLength={25}
              placeholder="Enter Name"
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

          <CardPickerComponent label="Date of Birth">
            <DatePicker
              defaultDate={new Date(compRef.state.idcardInfo.birthday)}
              minimumDate={new Date(2008, 1, 1)}
              maximumDate={new Date(2028, 12, 31)}
              locale={"en"}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              onDateChange={(date) => compRef.state.changeBirth(date)}
              disabled={!compRef.state.idcardInfoStatus.birthday}
            />
          </CardPickerComponent>

          <CardInputComponent label="Breed">
            <Input
              placeholder="Enter Breed..."
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

          <CardPickerComponent label="Gender">
            <Picker
              mode="dropdown"
              placeholder="Select Gender"
              placeholderStyle={{ color: Colors.placeholder }}
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
              selectedValue={
                compRef.state.idcardInfo.gender !== ""
                  ? compRef.state.idcardInfo.gender
                  : "Select Gender"
              }
              onValueChange={(itemValue, itemIndex) =>
                compRef.state.changeGender(itemValue)
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

          <CardInputComponent label="Contact">
            <Input
              placeholder="555 555 5555"
              placeholderTextColor={Colors.placeholder}
              onChangeText={(text) => compRef.state.changeContact1Phone(text)}
              keyboardType="phone-pad"
              returnKeyType="done"
              maxLength={12}
              value={
                compRef.state.idcardInfo.contact1
                  ? compRef.state.idcardInfo.contact1.phone
                  : ""
              }
              style={[
                compRef.state.idcardInfoStatus.contact1 &&
                styles.formText &&
                styles.formText,
                compRef.state.idcardInfoValidation.contact1 &&
                !compRef.state.idcardInfo.contact1.phone &&
                styles.inValidForm,
                !compRef.state.idcardInfoStatus.contact1 && {
                  color: Colors.inactiveTextColor,
                },
              ]}
              disabled={!compRef.state.idcardInfoStatus.contact1}
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
              placeholder="Enter State..."
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

          <CardInputComponent label="Note">
            <Input
              onChangeText={(text) => compRef.state.changeNote(text)}
              value={compRef.state.idcardInfo.note}
              placeholder="Enter Note..."
              placeholderTextColor={Colors.placeholder}
              style={[
                compRef.state.idcardInfoStatus.note && styles.formText,
                compRef.state.idcardInfoValidation.note &&
                !compRef.state.idcardInfo.note &&
                styles.inValidForm,
                !compRef.state.idcardInfoStatus.note && { color: Colors.inactiveTextColor },
              ]}
              disabled={!compRef.state.idcardInfoStatus.note}
            />
          </CardInputComponent>
          <CardPickerComponent label="Missing Since">
            <DatePicker
              defaultDate={new Date(compRef.state.idcardInfo.birthday)}
              minimumDate={new Date(2008, 1, 1)}
              maximumDate={new Date(2028, 12, 31)}
              locale={"en"}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              onDateChange={(date) => compRef.state.changeBirth(date)}
              disabled={!compRef.state.idcardInfoStatus.birthday}
            />
          </CardPickerComponent>
          <View style={[styles.buttonContainer, { marginBottom: 30 }]}>
            <TouchableOpacity
              style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}
              onPress={compRef.state.createKidsId}
            >
              <Image source={images.createPosterBtn} style={{width: '85%', resizeMode: 'contain'}}/>
            </TouchableOpacity>
          </View>
        </Form>
      )}
    </Content>
  </Container>
);
