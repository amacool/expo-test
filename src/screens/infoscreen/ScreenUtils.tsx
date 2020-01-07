// Define PropTypes
import { ScrollView, TouchableOpacity, View } from "react-native";
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
  <Container>
    <HeaderTabComponent title={"Missing Children"} />
    <Content style={styles.container} disableKBDismissScroll={true}>
      <View style={styles.welcomeContainer}>
        <MissingCard ref={(ref) => (compRef.imageRef = ref)} {...compRef.state.idcardRender} />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={compRef.state.chooseExistingID} style={styles.createBotton}>
          <Text style={styles.claimText}>USE MY EXISTING ID</Text>
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={compRef.state.uploadPhoto} style={styles.uploadBotton}>
            <Text style={styles.claimText}>UPLOAD PHOTO</Text>
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
          <ListItem noBorder>
            <Body>
              <Item stackedLabel>
                <Label>Full Name:</Label>
                <View
                  style={{
                    width: "100%",
                    height: 40,
                    borderRadius: 10,
                    backgroundColor: compRef.state.idcardInfoStatus.name
                      ? Colors.itemActive
                      : Colors.gray,
                    marginTop: 8,
                  }}
                >
                  <Input
                    onChangeText={(text) => compRef.state.changeName(text)}
                    maxLength={25}
                    placeholder="Full Name"
                    placeholderTextColor={Colors.placeholder}
                    value={compRef.state.idcardInfo.name}
                    style={[
                      compRef.state.idcardInfoStatus.name && styles.formText,
                      compRef.state.idcardInfoValidation.name &&
                        !compRef.state.idcardInfo.name &&
                        styles.inValidForm,
                      ,
                      !compRef.state.idcardInfoStatus.name && { color: Colors.inactiveTextColor },
                    ]}
                    disabled={!compRef.state.idcardInfoStatus.name}
                  />
                </View>
              </Item>
            </Body>
            <Right style={[styles.formSwitch]}>
              <Switch
                onValueChange={() => {
                  let props = { ...compRef.state.idcardInfoStatus };
                  props.name = !props.name;
                  compRef.setState({ idcardInfoStatus: props });
                  let realprops = { ...compRef.state.idcardRender };
                  if (!props.name) {
                    delete realprops.name;
                  } else {
                    realprops.name = compRef.state.idcardInfo.name;
                  }
                  compRef.setState({ idcardRender: realprops });
                }}
                value={compRef.state.idcardInfoStatus.name}
              />
            </Right>
          </ListItem>
          <ListItem noBorder>
            <Body>
              <Grid>
                <Col style={{ marginRight: 3 }}>
                  <Item stackedLabel>
                    <Label>State:</Label>
                    {/* <View
                      style={{
                        width: "100%",
                        height: 40,
                        borderRadius: 10,
                        backgroundColor: Colors.gray,
                        marginTop: 8,
                      }}
                    >
                      <Input
                        onChangeText={(text) => compRef.state.changeStateName(text)}
                        placeholder="State"
                        value={compRef.state.idcardInfo.state}
                        style={[
                          compRef.state.idcardInfoStatus.statecity && styles.formText,
                          compRef.state.idcardInfoValidation.statecity &&
                            !compRef.state.idcardInfo.state &&
                            styles.inValidForm,
                          ,
                        ]}
                        disabled={!compRef.state.idcardInfoStatus.statecity}
                      />
                    </View> */}
                    <View
                      style={{
                        borderBottomWidth: 1,
                        marginTop: 8,
                        flex: 1,
                        width: "100%",
                        backgroundColor: !!compRef.state.idcardInfoStatus.statecity
                          ? Colors.transparent
                          : Colors.transparent,
                        borderBottomColor:
                          compRef.state.idcardInfoValidation.statecity &&
                          !compRef.state.idcardInfo.state
                            ? Colors.buttonRed
                            : Colors.tabIconDefault,
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          borderRadius: 10,
                          overflow: "hidden",
                          justifyContent: "center",
                        }}
                      >
                        {compRef.state.idcardInfoStatus.statecity && (
                          <Picker
                            mode="dropdown"
                            placeholder="State"
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
                                : "State"
                            }
                            onValueChange={(itemValue, itemIndex) =>
                              compRef.state.changeStateName(itemValue)
                            }
                            // disabled={compRef.state.idcardInfoStatus.state}
                          >
                            <Item
                              label="State"
                              value=""
                              style={{ width: 100, backgroundColor: Colors.white }}
                            />
                            {compRef.state.states &&
                              compRef.state.states.length &&
                              compRef.state.states.map((item, key) => {
                                return (
                                  <Item
                                    label={item.abbreviation}
                                    value={item.name}
                                    key={key}
                                    style={{ width: 100, backgroundColor: Colors.white }}
                                  />
                                );
                              })}
                          </Picker>
                        )}
                        {!compRef.state.idcardInfoStatus.statecity && (
                          <Input
                            value={compRef.state.idcardInfo.state}
                            disabled={true}
                            style={{
                              height: 40,
                              width: "100%",
                              backgroundColor: Colors.gray,
                              textAlign: "center",
                              color: Colors.inactiveTextColor,
                            }}
                          />
                        )}
                      </View>
                    </View>
                  </Item>
                </Col>
                <Col style={{ marginLeft: 3 }}>
                  <Item stackedLabel>
                    <Label>City:</Label>
                    <View
                      style={{
                        width: "100%",
                        height: 40,
                        borderRadius: 10,
                        backgroundColor: compRef.state.idcardInfoStatus.statecity
                          ? Colors.itemActive
                          : Colors.gray,
                        marginTop: 8,
                      }}
                    >
                      <Input
                        placeholder="City"
                        placeholderTextColor={Colors.placeholder}
                        onChangeText={(text) => compRef.state.changeCityName(text)}
                        // returnKeyType="done"
                        // keyboardType="phone-pad"
                        value={compRef.state.idcardInfo.city}
                        style={[
                          compRef.state.idcardInfoStatus.statecity && styles.formText,
                          compRef.state.idcardInfoValidation.statecity &&
                            !compRef.state.idcardInfo.city &&
                            styles.inValidForm,
                          ,
                          !compRef.state.idcardInfoStatus.statecity && {
                            color: Colors.inactiveTextColor,
                          },
                        ]}
                        disabled={!compRef.state.idcardInfoStatus.statecity}
                      />
                    </View>
                  </Item>
                </Col>
              </Grid>
            </Body>
            <Right style={[styles.formSwitch]}>
              <Switch
                onValueChange={() => {
                  let props = { ...compRef.state.idcardInfoStatus };
                  props.statecity = !props.statecity;
                  compRef.setState({ idcardInfoStatus: props });
                  compRef.setState({ idcardInfoValidation: props });
                  let realprops = { ...compRef.state.idcardRender };
                  if (!props.statecity) {
                    delete realprops.city;
                    delete realprops.state;
                  } else {
                    realprops.city = compRef.state.idcardInfo.city;
                    realprops.state = compRef.state.idcardInfo.state;
                  }
                  compRef.setState({ idcardRender: realprops });
                }}
                value={compRef.state.idcardInfoStatus.statecity}
              />
            </Right>
          </ListItem>
          <ListItem noBorder>
            <Body>
              <Item stackedLabel>
                <Label>BirthDay:</Label>
                <View
                  style={{
                    borderBottomWidth: 1,
                    marginTop: 8,
                    flex: 1,
                    width: "100%",
                    backgroundColor: !!compRef.state.idcardInfoStatus.birthday
                      ? Colors.transparent
                      : Colors.transparent,
                    borderBottomColor:
                      compRef.state.idcardInfoValidation.birthday &&
                      !compRef.state.idcardInfo.birthday
                        ? Colors.buttonRed
                        : Colors.tabIconDefault,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      borderRadius: 10,
                      backgroundColor: compRef.state.idcardInfoStatus.birthday
                        ? Colors.itemActive
                        : Colors.gray,
                    }}
                  >
                    <DatePicker
                      defaultDate={new Date(compRef.state.idcardInfo.birthday)}
                      minimumDate={new Date(2008, 1, 1)}
                      maximumDate={new Date(2028, 12, 31)}
                      locale={"en"}
                      timeZoneOffsetInMinutes={undefined}
                      modalTransparent={false}
                      style={{ height: 40 }}
                      animationType={"fade"}
                      androidMode={"default"}
                      onDateChange={(date) => compRef.state.changeBirth(date)}
                      disabled={!compRef.state.idcardInfoStatus.birthday}
                    />
                  </View>
                </View>
              </Item>
            </Body>
            <Right style={[styles.formSwitch]}>
              <Switch
                onValueChange={() => {
                  let props = { ...compRef.state.idcardInfoStatus };
                  props.birthday = !props.birthday;
                  compRef.setState({ idcardInfoStatus: props });
                  compRef.setState({ idcardInfoValidation: props });
                  let realprops = { ...compRef.state.idcardRender };
                  if (!props.birthday) {
                    delete realprops.birthday;
                  } else {
                    realprops.birthday = compRef.state.idcardInfo.birthday;
                  }
                  compRef.setState({ idcardRender: realprops });
                }}
                value={compRef.state.idcardInfoStatus.birthday}
              />
            </Right>
          </ListItem>
          <ListItem noBorder>
            <Body>
              <Item stackedLabel>
                <Label>Gender:</Label>
                <View
                  style={{
                    borderBottomWidth: 1,
                    marginTop: 8,
                    flex: 1,
                    width: "100%",
                    backgroundColor: !!compRef.state.idcardInfoStatus.gender
                      ? Colors.transparent
                      : Colors.transparent,
                    borderBottomColor:
                      compRef.state.idcardInfoValidation.gender && !compRef.state.idcardInfo.gender
                        ? Colors.buttonRed
                        : Colors.tabIconDefault,
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      borderRadius: 10,
                      overflow: "hidden",
                      justifyContent: "center",
                    }}
                  >
                    {!!compRef.state.idcardInfoStatus.gender && (
                      <Picker
                        mode="dropdown"
                        placeholder="Select Gender"
                        placeholderStyle={{ color: Colors.placeholder }}
                        style={[
                          styles.formText,
                          {
                            height: 40,
                            borderBottomWidth: 0,
                            backgroundColor: Colors.itemActive,
                          },
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
                          label="Select Gender"
                          value=""
                          style={{ width: 100, backgroundColor: Colors.white }}
                        />
                        <Item
                          label="Male"
                          value="male"
                          style={{ width: 100, backgroundColor: Colors.white }}
                        />
                        <Item
                          label="Femail"
                          value="female"
                          style={{ width: 100, backgroundColor: Colors.white }}
                        />
                      </Picker>
                    )}
                    {!compRef.state.idcardInfoStatus.gender && (
                      <Input
                        value={compRef.state.idcardInfo.gender}
                        disabled={true}
                        style={{
                          height: 40,
                          width: "100%",
                          backgroundColor: Colors.gray,
                          textAlign: "center",
                          color: Colors.inactiveTextColor,
                        }}
                      />
                    )}
                  </View>
                </View>
              </Item>
            </Body>
            <Right style={[styles.formSwitch]}>
              <Switch
                onValueChange={() => {
                  let props = { ...compRef.state.idcardInfoStatus };
                  props.gender = !props.gender;
                  compRef.setState({ idcardInfoStatus: props });
                  compRef.setState({ idcardInfoValidation: props });
                  let realprops = { ...compRef.state.idcardRender };
                  if (!props.gender) {
                    delete realprops.gender;
                  } else {
                    realprops.gender = compRef.state.idcardInfo.gender;
                  }
                  compRef.setState({ idcardRender: realprops });
                }}
                value={compRef.state.idcardInfoStatus.gender}
              />
            </Right>
          </ListItem>
          <ListItem noBorder>
            <Body>
              <Item stackedLabel>
                <Label>Note:</Label>
                <View
                  style={{
                    width: "100%",
                    height: 40,
                    borderRadius: 10,
                    backgroundColor: compRef.state.idcardInfoStatus.note
                      ? Colors.itemActive
                      : Colors.gray,
                    marginTop: 8,
                  }}
                >
                  <Input
                    onChangeText={(text) => compRef.state.changeNote(text)}
                    placeholder="Note"
                    placeholderTextColor={Colors.placeholder}
                    value={compRef.state.idcardInfo.note}
                    style={[
                      compRef.state.idcardInfoStatus.note && styles.formText,
                      compRef.state.idcardInfoValidation.note &&
                        !compRef.state.idcardInfo.note &&
                        styles.inValidForm,
                      !compRef.state.idcardInfoStatus.note && { color: Colors.inactiveTextColor },
                    ]}
                    disabled={!compRef.state.idcardInfoStatus.note}
                  />
                </View>
              </Item>
            </Body>
            <Right style={[styles.formSwitch]}>
              <Switch
                onValueChange={() => {
                  let props = { ...compRef.state.idcardInfoStatus };
                  props.note = !props.note;
                  compRef.setState({ idcardInfoStatus: props });
                  compRef.setState({ idcardInfoValidation: props });
                  let realprops = { ...compRef.state.idcardRender };
                  if (!props.note) {
                    delete realprops.note;
                  } else {
                    realprops.note = compRef.state.idcardInfo.note;
                  }
                  compRef.setState({ idcardRender: realprops });
                }}
                value={compRef.state.idcardInfoStatus.note}
              />
            </Right>
          </ListItem>
          <ListItem noBorder>
            <Body>
              <Grid>
                <Col style={{ marginRight: 3 }}>
                  <Item stackedLabel>
                    <Label>Contact 1: </Label>
                    <View
                      style={{
                        width: "100%",
                        height: 40,
                        borderRadius: 10,
                        backgroundColor: compRef.state.idcardInfoStatus.contact
                          ? Colors.itemActive
                          : Colors.gray,
                        marginTop: 8,
                      }}
                    >
                      <Input
                        onChangeText={(text) => compRef.state.changeContact1(text)}
                        placeholder="555 555 5555"
                        placeholderTextColor={Colors.placeholder}
                        returnKeyType="done"
                        maxLength={12}
                        keyboardType="phone-pad"
                        value={compRef.state.idcardInfo.contact1}
                        style={[
                          compRef.state.idcardInfoStatus.contact && styles.formText,
                          compRef.state.idcardInfoValidation.contact &&
                            !compRef.state.idcardInfo.contact1 &&
                            styles.inValidForm,
                          !compRef.state.idcardInfoStatus.contact && {
                            color: Colors.inactiveTextColor,
                          },
                        ]}
                        disabled={!compRef.state.idcardInfoStatus.contact}
                      />
                    </View>
                  </Item>
                </Col>
                <Col style={{ marginLeft: 3 }}>
                  <Item stackedLabel>
                    <Label>Contact 2: </Label>
                    <View
                      style={{
                        width: "100%",
                        height: 40,
                        borderRadius: 10,
                        backgroundColor: compRef.state.idcardInfoStatus.contact
                          ? Colors.itemActive
                          : Colors.gray,
                        marginTop: 8,
                      }}
                    >
                      <Input
                        placeholder="555 444 5554"
                        placeholderTextColor={Colors.placeholder}
                        onChangeText={(text) => compRef.state.changeContact2(text)}
                        keyboardType="phone-pad"
                        maxLength={12}
                        returnKeyType="done"
                        value={compRef.state.idcardInfo.contact2}
                        style={[
                          compRef.state.idcardInfoStatus.contact &&
                            styles.formText &&
                            styles.formText,
                          compRef.state.idcardInfoValidation.contact &&
                            !compRef.state.idcardInfo.contact2 &&
                            styles.inValidForm,
                          !compRef.state.idcardInfoStatus.contact && {
                            color: Colors.inactiveTextColor,
                          },
                        ]}
                        disabled={!compRef.state.idcardInfoStatus.contact}
                      />
                    </View>
                  </Item>
                </Col>
              </Grid>
            </Body>
            <Right style={[styles.formSwitch]}>
              <Switch
                onValueChange={() => {
                  let props = { ...compRef.state.idcardInfoStatus };
                  props.contact = !props.contact;
                  compRef.setState({ idcardInfoStatus: props });
                  compRef.setState({ idcardInfoValidation: props });
                  let realprops = { ...compRef.state.idcardRender };
                  if (!props.contact) {
                    delete realprops.contact2;
                    delete realprops.contact1;
                  } else {
                    realprops.contact2 = compRef.state.idcardInfo.contact2;
                    realprops.contact1 = compRef.state.idcardInfo.contact1;
                  }
                  compRef.setState({ idcardRender: realprops });
                }}
                value={compRef.state.idcardInfoStatus.contact}
              />
            </Right>
          </ListItem>
          <ListItem noBorder>
            <Body>
              <Grid>
                <Col style={{ marginRight: 3 }}>
                  <Item stackedLabel>
                    <Label>Weight:</Label>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        marginTop: 8,
                        flex: 1,
                        width: "100%",
                        backgroundColor: !!compRef.state.idcardInfoStatus.weightheight
                          ? Colors.transparent
                          : Colors.transparent,
                        borderBottomColor:
                          compRef.state.idcardInfoValidation.weightheight &&
                          !compRef.state.idcardInfo.weight
                            ? Colors.buttonRed
                            : Colors.tabIconDefault,
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          borderRadius: 10,
                          overflow: "hidden",
                          justifyContent: "center",
                        }}
                      >
                        {!!compRef.state.idcardInfoStatus.weightheight && (
                          <Picker
                            mode="dropdown"
                            placeholder="Weight"
                            placeholderStyle={{ color: Colors.placeholder }}
                            style={[
                              styles.formText,
                              {
                                height: 40,
                                backgroundColor: Colors.itemActive,
                                borderBottomWidth: 0,
                              },
                            ]}
                            iosIcon={
                              <Icon
                                name="arrow-down"
                                style={{ fontSize: 25, position: "absolute", right: 0 }}
                              />
                            }
                            selectedValue={
                              compRef.state.idcardInfo.weight !== undefined
                                ? compRef.state.idcardInfo.weight
                                : "Weight"
                            }
                            onValueChange={(itemValue, itemIndex) =>
                              compRef.state.changeWeight(itemValue)
                            }
                          >
                            <Item
                              label="Weight"
                              value=""
                              style={{ width: 100, backgroundColor: Colors.white }}
                            />
                            {compRef.state.weight &&
                              compRef.state.weight.length &&
                              compRef.state.weight.map((item, key) => {
                                return (
                                  <Item
                                    label={item.value}
                                    value={item.value}
                                    key={key}
                                    style={{ width: 100, backgroundColor: Colors.white }}
                                  />
                                );
                              })}
                          </Picker>
                        )}
                        {!compRef.state.idcardInfoStatus.weightheight && (
                          <Input
                            value={compRef.state.idcardInfo.weight}
                            disabled={true}
                            style={{
                              height: 40,
                              width: "100%",
                              backgroundColor: Colors.gray,
                              textAlign: "center",
                              color: Colors.inactiveTextColor,
                            }}
                          />
                        )}
                      </View>
                    </View>
                    {/*<Input*/}
                    {/*onChangeText={(text) => compRef.state.changeWeight(text)}*/}
                    {/*placeholder="Weight"*/}
                    {/*keyboardType='number-pad'*/}
                    {/*value={compRef.state.idcardInfo.weight}*/}
                    {/*style={[compRef.state.idcardInfoStatus.weightheight && styles.formText,*/}
                    {/*(compRef.state.idcardInfoValidation.weightheight && !compRef.state.idcardInfo.weight) && styles.inValidForm]}*/}
                    {/*disabled={!compRef.state.idcardInfoStatus.weightheight}*/}
                    {/*/>*/}
                  </Item>
                </Col>
                <Col style={{ marginLeft: 3 }}>
                  <Item stackedLabel>
                    <Label>Height:</Label>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        marginTop: 8,
                        flex: 1,
                        width: "100%",
                        backgroundColor: !!compRef.state.idcardInfoStatus.weightheight
                          ? Colors.transparent
                          : Colors.transparent,
                        borderBottomColor:
                          compRef.state.idcardInfoValidation.weightheight &&
                          !compRef.state.idcardInfo.height
                            ? Colors.buttonRed
                            : Colors.tabIconDefault,
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          borderRadius: 10,
                          overflow: "hidden",
                          justifyContent: "center",
                        }}
                      >
                        {!!compRef.state.idcardInfoStatus.weightheight && (
                          <Picker
                            mode="dropdown"
                            placeholder="Height"
                            placeholderStyle={{ color: Colors.placeholder }}
                            style={[
                              styles.formText,
                              {
                                height: 40,
                                backgroundColor: Colors.itemActive,
                                borderBottomWidth: 0,
                              },
                            ]}
                            iosIcon={
                              <Icon
                                name="arrow-down"
                                style={{ fontSize: 25, position: "absolute", right: 0 }}
                              />
                            }
                            selectedValue={
                              compRef.state.idcardInfo.height !== undefined
                                ? compRef.state.idcardInfo.height
                                : "Height"
                            }
                            onValueChange={(itemValue, itemIndex) =>
                              compRef.state.changeHeight(itemValue)
                            }
                          >
                            <Item
                              label="Height"
                              value=""
                              style={{ width: 100, backgroundColor: Colors.white }}
                            />
                            {compRef.state.heights &&
                              compRef.state.heights.length &&
                              compRef.state.heights.map((item, key) => {
                                return (
                                  <Item
                                    label={item.value}
                                    value={item.value}
                                    key={key}
                                    style={{ width: 100, backgroundColor: Colors.white }}
                                  />
                                );
                              })}
                          </Picker>
                        )}
                        {!compRef.state.idcardInfoStatus.weightheight && (
                          <Input
                            value={compRef.state.idcardInfo.height}
                            disabled={true}
                            style={{
                              height: 40,
                              width: "100%",
                              backgroundColor: Colors.gray,
                              textAlign: "center",
                              color: Colors.inactiveTextColor,
                            }}
                          />
                        )}
                      </View>
                    </View>
                    {/*<Input*/}
                    {/*placeholder="Height"*/}
                    {/*onChangeText={(text) => compRef.state.changeHeight(text)}*/}
                    {/*keyboardType='number-pad'*/}
                    {/*value={compRef.state.idcardInfo.height}*/}
                    {/*style={[compRef.state.idcardInfoStatus.weightheight && styles.formText && styles.formText,*/}
                    {/*(compRef.state.idcardInfoValidation.weightheight && !compRef.state.idcardInfo.height) && styles.inValidForm]}*/}
                    {/*disabled={!compRef.state.idcardInfoStatus.weightheight}*/}
                    {/*/>*/}
                  </Item>
                </Col>
              </Grid>
            </Body>
            <Right style={[styles.formSwitch]}>
              <Switch
                onValueChange={() => {
                  let props = { ...compRef.state.idcardInfoStatus };
                  props.weightheight = !props.weightheight;
                  compRef.setState({ idcardInfoStatus: props });
                  compRef.setState({ idcardInfoValidation: props });
                  let realprops = { ...compRef.state.idcardRender };
                  if (!props.weightheight) {
                    delete realprops.height;
                    delete realprops.weight;
                  } else {
                    realprops.weight = compRef.state.idcardInfo.weight;
                    realprops.height = compRef.state.idcardInfo.height;
                  }
                  compRef.setState({ idcardRender: realprops });
                }}
                value={compRef.state.idcardInfoStatus.weightheight}
              />
            </Right>
          </ListItem>
          <ListItem noBorder>
            <Body>
              <Grid>
                <Col style={{ marginRight: 3 }}>
                  <Item stackedLabel>
                    <Label>Hair Color:</Label>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        marginTop: 8,
                        flex: 1,
                        width: "100%",
                        backgroundColor: !!compRef.state.idcardInfoStatus.haireyescolor
                          ? Colors.transparent
                          : Colors.transparent,
                        borderBottomColor:
                          compRef.state.idcardInfoValidation.haireyescolor &&
                          !compRef.state.idcardInfo.haircolor
                            ? Colors.buttonRed
                            : Colors.tabIconDefault,
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          borderRadius: 10,
                          overflow: "hidden",
                          justifyContent: "center",
                        }}
                      >
                        {!!compRef.state.idcardInfoStatus.haireyescolor && (
                          <Picker
                            mode="dropdown"
                            placeholder="Hair Color"
                            placeholderStyle={{ color: Colors.placeholder }}
                            textStyle={{ fontSize: wp("3.6") }}
                            style={[
                              styles.formText,
                              {
                                height: 40,
                                backgroundColor: Colors.itemActive,
                                borderBottomWidth: 0,
                              },
                            ]}
                            iosIcon={
                              <Icon
                                name="arrow-down"
                                style={{ fontSize: 25, position: "absolute", right: 0 }}
                              />
                            }
                            selectedValue={
                              compRef.state.idcardInfo.haircolor !== ""
                                ? compRef.state.idcardInfo.haircolor
                                : "Hair Color"
                            }
                            onValueChange={(itemValue, itemIndex) =>
                              compRef.state.changeHairColor(itemValue)
                            }
                          >
                            <Item
                              label="Hair Color"
                              value=""
                              style={{ width: 100, backgroundColor: Colors.white }}
                            />
                            {compRef.state.haircolors &&
                              compRef.state.haircolors.length &&
                              compRef.state.haircolors.map((item, key) => {
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
                        )}
                        {!compRef.state.idcardInfoStatus.haireyescolor && (
                          <Input
                            value={compRef.state.idcardInfo.haircolor}
                            disabled={true}
                            style={{
                              height: 40,
                              width: "100%",
                              backgroundColor: Colors.gray,
                              textAlign: "center",
                              color: Colors.inactiveTextColor,
                            }}
                          />
                        )}
                      </View>
                    </View>
                    {/*<Input*/}
                    {/*onChangeText={(text) => compRef.state.changeHairColor(text)}*/}
                    {/*placeholder="Hair Color"*/}
                    {/*value={compRef.state.idcardInfo.haircolor}*/}
                    {/*style={[compRef.state.idcardInfoStatus.haireyescolor && styles.formText,*/}
                    {/*(compRef.state.idcardInfoValidation.haireyescolor && !compRef.state.idcardInfo.haircolor) && styles.inValidForm]}*/}
                    {/*disabled={!compRef.state.idcardInfoStatus.haireyescolor}*/}
                    {/*/>*/}
                  </Item>
                </Col>
                <Col>
                  <Item stackedLabel>
                    <Label>Eyes Color:</Label>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        marginTop: 8,
                        flex: 1,
                        width: "100%",
                        backgroundColor: !!compRef.state.idcardInfoStatus.haireyescolor
                          ? Colors.transparent
                          : Colors.transparent,
                        borderBottomColor:
                          compRef.state.idcardInfoValidation.haireyescolor &&
                          !compRef.state.idcardInfo.eyecolor
                            ? Colors.buttonRed
                            : Colors.tabIconDefault,
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          borderRadius: 10,
                          overflow: "hidden",
                          justifyContent: "center",
                        }}
                      >
                        {!!compRef.state.idcardInfoStatus.haireyescolor && (
                          <Picker
                            mode="dropdown"
                            placeholder="Eyes Color"
                            placeholderStyle={{ color: Colors.placeholder }}
                            textStyle={{ fontSize: wp("3.6") }}
                            style={[
                              styles.formText,
                              {
                                height: 40,
                                backgroundColor: Colors.itemActive,
                                borderBottomWidth: 0,
                              },
                            ]}
                            iosIcon={
                              <Icon
                                name="arrow-down"
                                style={{ fontSize: 25, position: "absolute", right: 0 }}
                              />
                            }
                            selectedValue={
                              compRef.state.idcardInfo.eyecolor !== ""
                                ? compRef.state.idcardInfo.eyecolor
                                : "Eyes Color"
                            }
                            onValueChange={(itemValue, itemIndex) =>
                              compRef.state.changeEyesColor(itemValue)
                            }
                          >
                            <Item
                              label="Eyes Color"
                              value=""
                              style={{ width: 100, backgroundColor: Colors.white }}
                            />
                            {compRef.state.eyescolors &&
                              compRef.state.eyescolors.length &&
                              compRef.state.eyescolors.map((item, key) => {
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
                        )}
                        {!compRef.state.idcardInfoStatus.haireyescolor && (
                          <Input
                            value={compRef.state.idcardInfo.eyecolor}
                            disabled={true}
                            style={{
                              height: 40,
                              width: "100%",
                              backgroundColor: Colors.gray,
                              textAlign: "center",
                              color: Colors.inactiveTextColor,
                            }}
                          />
                        )}
                      </View>
                    </View>
                    {/*<Input*/}
                    {/*placeholder="Eyes Color"*/}
                    {/*onChangeText={(text) => compRef.state.changeEyesColor(text)}*/}
                    {/*keyboardType='phone-pad'*/}
                    {/*value={compRef.state.idcardInfo.eyecolor}*/}
                    {/*style={[compRef.state.idcardInfoStatus.haireyescolor && styles.formText && styles.formText,*/}
                    {/*(compRef.state.idcardInfoValidation.haireyescolor && !compRef.state.idcardInfo.eyecolor) && styles.inValidForm]}*/}
                    {/*disabled={!compRef.state.idcardInfoStatus.haireyescolor}*/}
                    {/*/>*/}
                  </Item>
                </Col>
              </Grid>
            </Body>
            <Right style={[styles.formSwitch]}>
              <Switch
                onValueChange={() => {
                  let props = { ...compRef.state.idcardInfoStatus };
                  props.haireyescolor = !props.haireyescolor;
                  compRef.setState({ idcardInfoStatus: props });
                  compRef.setState({ idcardInfoValidation: props });
                  let realprops = { ...compRef.state.idcardRender };
                  if (!props.haireyescolor) {
                    delete realprops.haircolor;
                    delete realprops.eyecolor;
                  } else {
                    realprops.haircolor = compRef.state.idcardInfo.haircolor;
                    realprops.eyecolor = compRef.state.idcardInfo.eyecolor;
                  }
                  compRef.setState({ idcardRender: realprops });
                }}
                value={compRef.state.idcardInfoStatus.haireyescolor}
              />
            </Right>
          </ListItem>
          <ListItem noBorder>
            <Body>
              <Item stackedLabel>
                <Label>Missing since:</Label>
                <View
                  style={{
                    borderBottomWidth: 1,
                    marginTop: 8,
                    flex: 1,
                    width: "100%",
                    backgroundColor: !!compRef.state.idcardInfoStatus.missingDate
                      ? Colors.transparent
                      : Colors.transparent,
                    borderBottomColor:
                      compRef.state.idcardInfoValidation.missingDate &&
                      !compRef.state.idcardInfo.missingDate
                        ? Colors.buttonRed
                        : Colors.tabIconDefault,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      borderRadius: 10,
                      backgroundColor: compRef.state.idcardInfoStatus.missingDate
                        ? Colors.itemActive
                        : Colors.gray,
                    }}
                  >
                    <DatePicker
                      defaultDate={compRef.state.idcardInfo.missingDate}
                      minimumDate={new Date(2008, 1, 1)}
                      maximumDate={new Date(2028, 12, 31)}
                      locale={"en"}
                      timeZoneOffsetInMinutes={undefined}
                      style={{ height: 40 }}
                      modalTransparent={false}
                      animationType={"fade"}
                      androidMode={"default"}
                      onDateChange={(date) => compRef.state.changeMissingDate(date)}
                      disabled={!compRef.state.idcardInfoStatus.missingDate}
                    />
                  </View>
                </View>
              </Item>
            </Body>
            <Right style={[styles.formSwitch]}>
              <Switch
                onValueChange={() => {
                  let props = { ...compRef.state.idcardInfoStatus };
                  props.missingDate = !props.missingDate;
                  compRef.setState({ idcardInfoStatus: props });
                  compRef.setState({ idcardInfoValidation: props });
                  let realprops = { ...compRef.state.idcardRender };
                  if (!props.missingDate) {
                    delete realprops.missingDate;
                  } else {
                    realprops.missingDate = compRef.state.idcardInfo.missingDate;
                  }
                  compRef.setState({ idcardRender: realprops });
                }}
                value={compRef.state.idcardInfoStatus.missingDate}
              />
            </Right>
          </ListItem>
          <View style={[styles.buttonContainer, { marginBottom: 30 }]}>
            <TouchableOpacity
              onPress={compRef.state.createKidsId}
              style={[styles.createBotton, { marginBottom: 80 }]}
            >
              <Text style={styles.claimText}>CREATE MY POSTER</Text>
            </TouchableOpacity>
          </View>
        </Form>
      )}
    </Content>
  </Container>
);
