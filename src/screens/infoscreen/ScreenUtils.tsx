// Define PropTypes
import { Image, TouchableOpacity, View } from "react-native";
import RF from "react-native-responsive-fontsize";
import {
  Container,
  Content,
  Form,
  Text,
  Icon,
  DatePicker,
  Picker,
  Item,
  Input,
} from "native-base";
import * as React from "react";
import { Switch } from 'react-native-switch';
import MissingCard from "../../components/MissingCard";
import MissingScreen from "./InfoScreen";
import { styles } from "./Styles";
import Colors from "../../constants/Colors";
import HeaderComponent from "../../components/headerComponent";
import images from "../../assets/images";
import CardInputComponent from "../../components/CardInputComponent";
import CardPickerComponent from "../../components/CardPickerComponent";

export interface Props {}

// Define States
export interface State {
  idcardInfo: MessingCardInterface;
  idcardRender: MessingCardInterface;
  idcardInfoValidation: MissingCardStatusInterface;
  cardIndex: number;
  states: any;
  isValid: boolean,
  isIDSelected: boolean,
  isRewarded: boolean,
  chooseExistingID: () => void;
  uploadPhoto: () => void;
  changeInfo: (key: string, value: string) => void;
  changeContactInfo: (key: string, value: string) => void;
  createKidsId: () => void;
}

export const render = (compRef: MissingScreen) => (
  <Container style={styles.container}>
    <HeaderComponent title={"Report Missing"} message back={false} />
    <Content style={styles.bodyContainer} disableKBDismissScroll={true}>
      <View style={styles.welcomeContainer}>
        <MissingCard isRewarded={compRef.state.isRewarded} ref={(ref) => (compRef.imageRef = ref)} {...compRef.state.idcardRender} />
        <Text style={[styles.problemText, { marginTop: 15 }]}>Do you have a missing dog?</Text>
        <Text style={[styles.problemText, { marginBottom: 15 }]}>Create poster!</Text>
      </View>
      {/* {compRef.state.isIDSelected && (
        <View style={[styles.buttonContainer, {marginTop: 5}]}>
          <Grid>
            <Col style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
              <TouchableOpacity>
                <Image
                  source={images.fbIcon}
                  resizeMode="contain"
                  style={{
                    width: 50,
                    marginTop: 8
                  }}
                />
              </TouchableOpacity>
            </Col>
            <Col>
              <TouchableOpacity>
                <Image
                  source={images.instaIcon}
                  resizeMode="contain"
                  style={{
                    width: 50,
                    marginTop: 8
                  }}
                />
              </TouchableOpacity>
            </Col>
          </Grid>
        </View>
      )} */}
      <View style={{ marginBottom: 10 }}>
        <View style={styles.switchReward}>
          <Text style={{ fontSize: RF(3) }}>Reward</Text>
          <Switch
            value={compRef.state.isRewarded}
            onValueChange={(val) => compRef.setState({ isRewarded: val })}
            disabled={false}
            activeText={'On'}
            inActiveText={'Off'}
            circleSize={22}
            barHeight={25}
            circleBorderWidth={0}
            backgroundActive={Colors.mainColor}
            backgroundInactive={'rgba(127, 143, 166, 0.5)'}
            circleActiveColor={'white'}
            circleInActiveColor={'white'}
            changeValueImmediately={true}
            // renderInsideCircle={() => <CustomComponent />}
            innerCircleStyle={{ alignItems: "center", justifyContent: "center" }}
            outerCircleStyle={{}}
            renderActiveText={false}
            renderInActiveText={false}
            switchLeftPx={2}
            switchRightPx={2}
            switchWidthMultiplier={2.2}
          />
        </View>
      </View>
      <View style={{ marginBottom: compRef.state.isIDSelected ? 10 : 50 }}>
        <TouchableOpacity onPress={compRef.state.chooseExistingID}>
          <View style={styles.btnExistingWrapper}>
            <Text style={styles.btnExisting}>
              Use Existing ID
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {compRef.state.isIDSelected && (
        <View style={{alignItems: "center"}}>
          <TouchableOpacity style={styles.problemBotton}>
            <Text style={[styles.problemText]}>OR fill the form below</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* {compRef.state.isIDSelected && (
        <View style={[styles.buttonContainer, { marginBottom: 10 }]}>
          <TouchableOpacity
            style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}
            onPress={compRef.state.uploadPhoto}
          >
            <Image source={images.downloadPhotoBtn} style={{width: '85%', resizeMode: 'contain'}}/>
          </TouchableOpacity>
        </View>
      )} */}

      {compRef.state.isIDSelected && (
        <Form>
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
              defaultDate={new Date(compRef.state.idcardInfo.birthday)}
              minimumDate={new Date(2008, 1, 1)}
              maximumDate={new Date(2028, 12, 31)}
              locale={"en"}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              textStyle={{fontFamily: 'Metropolis-Medium', color: Colors.black,}}
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
          <CardPickerComponent label="Missing Since">
            <DatePicker
              defaultDate={compRef.state.idcardInfo.missingDate}
              minimumDate={new Date(2008, 1, 1)}
              maximumDate={new Date(2028, 12, 31)}
              locale={"en"}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              onDateChange={(date) => compRef.state.changeInfo('missingDate', date)}
            />
          </CardPickerComponent>
          <CardInputComponent label="Description">
            <Input
              placeholder="Enter Description..."
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
          <View style={{ marginBottom: 50, marginTop: 20 }}>
            <TouchableOpacity onPress={compRef.state.chooseExistingID}>
              <View style={[styles.btnExistingWrapper, { backgroundColor: Colors.white }]}>
                <Text style={[styles.btnExisting, { color: Colors.mainColor }]}>
                  + Add Reward
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </Form>
      )}
    </Content>
  </Container>
);
